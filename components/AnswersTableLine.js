import React from 'react';
import {Link} from 'react-router-dom';





const AnswersTableLine = (props) => {
    return (
        <tr>
            <td data-th="Nazwa"><span> </span> {props.name}</td>
            <td data-th="Data wyświetlania">
                <span className="from"> od</span> {props.dateFrom}
                <div></div>
                <span className="to"> do</span> {props.dateTo}
            </td>
            <td data-th="Ilość wyświetleń"> {props.showNumber} </td>
            <td data-th="Ilość odpowiedzi"> {props.answersNumber}</td>
            {props.answersNumber > 0 ?
                (
                    <td data-th="Akcje"><span> </span>
                        <a className="btn" href="http://tell-it-us.development/app/answers/30" title="Wyniki">Wyniki</a>
                    </td>
                )
                :
                (
                    //TODO - btn is availiable because at this point of time there is no info from api about answers.
                    <td data-th="Akcje"><span> </span>
                        <Link className="btn" to={`answers/${props.campaignId}`} title="Wyniki">Wyniki</Link>
                    </td>
                    // <td data-th="Akcje"><span> </span> 
                    //     <a className="btn disabled" href="#">Brak wyników</a>
                    // </td>
                )
            }

        </tr>
    )
}

export default AnswersTableLine;