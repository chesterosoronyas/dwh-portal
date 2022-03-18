import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import * as currentOnArtByPartnerSelectors from '../../../selectors/CT/CurrentOnArt/currentOnArtByPartner';

const CurrentOnArtByPartner = () => {
    const [currentOnArtByPartnerChart, setCurrentOnArtByPartnerChart] = useState({});
    const currentOnArtByPartnerData = useSelector(currentOnArtByPartnerSelectors.getCurrentOnArtByPartner);

    const loadCurrentOnArtByPartnerChart = useCallback(async () => {
        setCurrentOnArtByPartnerChart({
            title: { text: '' },
            xAxis: [{ categories: currentOnArtByPartnerData.partners, crosshair: true }],
            yAxis: [{ title: { text: '' }}],
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: { column: { pointPadding: 0.2, borderWidth: 0, dataLabels: { enabled: true, crop: false, overflow: 'none' } } },
            series: [{ data: currentOnArtByPartnerData.currentOnArt, name: 'Number currently on ART', type: 'column', color: "#142459", }]
        });
    }, [currentOnArtByPartnerData]);

    useEffect(() => {
        loadCurrentOnArtByPartnerChart();
    }, [loadCurrentOnArtByPartnerChart]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        Distribution of Patients currently on ART by Partner*
                    </CardHeader>
                    <CardBody className="trends-body">
                        <HighchartsReact highcharts={Highcharts} options={currentOnArtByPartnerChart} />
                    </CardBody>
                </Card>
            </div>
            <div className="col-12">
                *This indicator is computed and displayed for the last completed month.
            </div>
        </div>
    );
}

export default CurrentOnArtByPartner;
