/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled'
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { useState } from 'react';
import { postIncome } from './api'

const Input = styled.input`
    border: 1px solid #333;
    padding: 12px;
`

const Label = styled.label`
    font-size: 18px;
    margin-right: 10px;
    display: inline-block;
`

const taxYearLookup = {
    '2016/17': '2016-04-06',
    '2017/18': '2017-04-06',
    '2018/19': '2018-04-06',
    '2019/20': '2019-04-06',
};


const Main = () => {
    const [income, setIncome] = useState();
    const [taxResult, setTaxResult] = useState();
    async function onSubmit(e) {
        e.preventDefault();
        if (isNaN(parseFloat(income))) return;
        const result = {
            '2018/19': await postIncome(income, taxYearLookup['2018/19']),
            '2019/20': await postIncome(income, taxYearLookup['2019/20'])
        }
        // console.log({ result })
        setTaxResult(result);
    }

    return (
        <div style={{ padding: 20 }}>
            <form onSubmit={onSubmit}>
                <Label>input you income</Label>
                <Input onChange={(e) => setIncome(e.target.value)} placeholder="703" />
                <button type="submit">submit</button>
            </form>
            {taxResult && Object.keys(taxResult).length === 2 && (
                <div>
                    NI you need to pay for
                    2018/19: <strong>{taxResult['2018/19'] && taxResult['2018/19'].ni}</strong> and
                    2019/20: <strong>{taxResult['2019/20'] && taxResult['2019/20'].ni}</strong>
                </div>
            )}
        </div>
    )
}

const App = ({ store }) =>
    <Provider store={store}>
        <Main />
    </Provider>;

App.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

export default App;
