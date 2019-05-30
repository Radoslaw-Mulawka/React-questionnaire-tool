import React from 'react';
import {Link} from 'react-router-dom';



const CampaignsTableLine = (props) => {
    return (
        <tr>
            <td data-th="Nazwa"> {props.campaignName}</td>
            <td data-th="Status"><span> </span>
                {props.campaignStatus == 1? "Opublikowana" : "Wersja robocza"}
            </td>
            <td data-th="Data wyświetlania">
                <span className="from">od</span> {props.campaignDateFrom}
                                <div></div>
                <span className="to">do</span> {props.campaignDateTo} <div></div>
            </td>
            <td data-th="Akcje"><span> </span>
                <Link className="btn" to={'/campaigns/'+props.campaignId} title="Edytuj">Edytuj</Link>
            </td>
        </tr>
    )
}



export default CampaignsTableLine;