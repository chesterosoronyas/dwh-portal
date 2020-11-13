import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import Highstock from 'highcharts/highstock';
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';
import moment from 'moment';

const CountyReports = ({ globalFilter }) => {
    const monthYear = moment(globalFilter.period, 'YYYY,M').format('MMMM YYYY');
    const [emrDistribution, setEmrDistribution] = useState({
    });

    const [recencyOfReportingByCounty, setRecencyOfReportingByCounty] = useState({});

    const [consistencyOfReportingByCounty, setConsistencyOfReportingByCounty] = useState({});

    

    const loademrDistribution = useCallback(async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        const result = await getAll('manifests/emrdistribution/' + params.docket + '?reportingType=county', params);
        const counties = result.map(({ county  }) => county);
        const counties_series = result.map(({ facilities_count }) => parseInt(facilities_count, 10));

        setEmrDistribution({
            chart: { type: 'bar' },
            title: { text: '' },
            subtitle: { text: '' },
            xAxis: { categories: counties, title: { text: null }, visible: true },
            yAxis: { min: 0, title: { text: 'Number of Facilities by County', align: 'high' }, labels: { overflow: 'justify' }, visible: true },
            tooltip: { valueSuffix: '' },
            plotOptions: { bar: { dataLabels: { enabled: true } } },
            legend: { enabled: false },
            responsive: { rules: [ { chartOptions: { legend: { enabled: false } } } ] },
            series: [{ data: counties_series, color: "#2F4050;", name: 'Distribution of EMR Sites' }]
        });
    }, [globalFilter]);

    const loadRecencyOfReportingByCounty = useCallback(async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        const result = await getAll('manifests/recencyreportingbycounty/' + params.docket, params);
        const counties = result.map(({ county  }) => county);
        const counties_series = result.map(({ Percentage }) => parseInt(Percentage, 10));

        setRecencyOfReportingByCounty({
            chart: { type: 'bar' },
            title: { text: '' },
            subtitle: { text: '' },
            xAxis: { categories: counties, title: { text: null } },
            yAxis: { min: 0, max: 100, title: { text: 'Percentage (%) of Overall Reporting Rates', align: 'high' }, labels: { overflow: 'justify' } },
            tooltip: { valueSuffix: '' },
            plotOptions: { bar: { dataLabels: { enabled: true } } },
            legend: { enabled: false },
            series: [{ name: "Overall Reporting Rates", data: counties_series, color: "#59A14F", tooltip: { valueSuffix: ' %' } }]
        });
    }, [globalFilter]);

    const loadConsistencyOfReportingByCounty = useCallback(async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        const result = await getAll('manifests/consistencyreportingbycountypartner/' + params.docket + '?reportingType=county', params);
        const counties = Object.keys(result);
        const counties_series = Object.values(result);

        setConsistencyOfReportingByCounty({
            chart: { type: 'bar' },
            title: { text: '' },
            subtitle: { text: '' },
            xAxis: { categories: counties, title: { text: null } },
            yAxis: { min: 0, max: 100, title: { text: 'Percentage (%) of Consistency of Reporting', align: 'high' }, labels: { overflow: 'justify' } },
            tooltip: { valueSuffix: '' },
            plotOptions: { bar: { dataLabels: { enabled: true } } },
            legend: { enabled: false },
            series: [{ data: counties_series, color: "#F28E2B", name: 'Consistency of Reporting', tooltip: { valueSuffix: ' %' } }]
        });
    }, [globalFilter]);

    useEffect(() => {
        loademrDistribution();
        loadRecencyOfReportingByCounty();
        loadConsistencyOfReportingByCounty();
    }, [loademrDistribution, loadRecencyOfReportingByCounty, loadConsistencyOfReportingByCounty]);

    return (
        <div className="row">
            <div className="col-4">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        Distribution of EMR sites
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highstock} options={emrDistribution} />
                        </div>
                    </CardBody>
                </Card>
            </div>

            <div className="col-4">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        Overall Reporting Rates
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={recencyOfReportingByCounty} />
                        </div>
                    </CardBody>
                </Card>
            </div>

            <div className="col-4">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        Consistency Of Reporting
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={consistencyOfReportingByCounty} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default CountyReports;
