import React, { PureComponent } from 'react';
import CampaignsTableLine from './../components/CampaignsTableLine';
import GlobalContainer from './GlobalContainer';
import Settings from './../components/Settings';
import axios from 'axios';


class CampaignsList extends PureComponent {
    state = {
        campaigns: []
    }


    componentDidMount() {
        axios.get('/campaigns?sort_by=campaignCreateDate&sort_order=desc').then(response => {

            this.setState({
                campaigns: response.data.data.items
            })
        })
    }

    render() {
        let campaignsTableLine = this.state.campaigns.map((item, index) => {
            return (
                <CampaignsTableLine key={index} {...this.state.campaigns[index]} />
            )
        });

        return (
            // Object.keys(this.state.campaigns).length == 0 ?
            //     <div className="places-preloader" ></div>
            //     :
                <GlobalContainer>
                    <Settings pageName="KAMPANIE" editable buttonText="Dodaj nową" linkTo="campaigns/create" />
                    <div className="table-wrap">
                        <table className="table-responsive">
                            <thead className="thead-default">
                                <tr>
                                    <th className="name">Nazwa</th>
                                    <th className="status">Status</th>
                                    <th className="data">Data wyświetlania</th>
                                    <th className="action">Akcje</th>
                                </tr>
                            </thead>
                            <tbody>
                                {campaignsTableLine}
                            </tbody>
                        </table>
                    </div>
                </GlobalContainer>
        );
    }
}

export default CampaignsList;
