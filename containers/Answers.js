import React, { Component } from 'react';
import AnswersTableLine from './../components/AnswersTableLine';
import GlobalContainer from './GlobalContainer';
import Settings from './../components/Settings';
import axios from 'axios';




class Answers extends Component {
    state = {
        answers: []
    }


    componentDidMount() {
        axios.get('/campaigns?sort_by=campaignCreateDate&sort_order=desc').then(response => {
            this.setState({
                answers: response.data.data.items
            })
        })
    }



    render() {
        let answerLines = this.state.answers.map((item, index) => {
            return (
                <AnswersTableLine
                    key={item.campaignId}
                    name={item.campaignName}
                    dateFrom={item.campaignDateFrom}
                    dateTo={item.campaignDateTo}
                    campaignId={item.campaignId}
                // showNumber={item.showNumber}
                // answersNumber={item.answersNumber} />
                />
            )
        });

        return (
            // Object.keys(this.state.answers).length == 0 ?
            //     <div className="places-preloader" ></div>
            //     :
                <GlobalContainer>
                    <Settings pageName="WYNIKI KAMPANII" />
                    <div className="table-wrap">
                        <table className="table-responsive">
                            <thead className="thead-default">
                                <tr>
                                    <th>Nazwa</th>
                                    <th>Data wyświetlania</th>
                                    <th>Ilość wyświetleń</th>
                                    <th>Ilość odpowiedzi</th>
                                    <th>Akcje</th>
                                </tr>
                            </thead>
                            <tbody>
                                {answerLines}
                            </tbody>
                        </table>
                    </div>
                </GlobalContainer>
        );
    }
}

export default Answers;
