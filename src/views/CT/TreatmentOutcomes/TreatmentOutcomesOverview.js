import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { getAll } from '../../Shared/Api';
import moment from "moment";

const TreatmentOutcomesOverview = () => {
    const filters = useSelector(state => state.filters);
    const [treatmentOutcomes, setTreatmentOutcomes] = useState({
        active: 0,
        dead: 0,
        deadPercent: 0,
        ltfu: 0,
        ltfuPercent: 0,
        stopped: 0,
        stoppedPercent: 0,
        net: 0,
        netPercent: 0,
        to: 0,
        toPercent: 0,
    });
    const [newlyStartedOnARTTiles, setNewlyStartedOnARTTiles] = useState({
        totalStartedOnART: 0,
        totalStartedOnARTText: '',
    });

    const loadTreatmentOutcomes = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
            year: filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("YYYY") : ''
        };
        params.month = filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("MM") : '';
        const result = await getAll('care-treatment/treatmentOutcomesOverall', params);
        let data = {
            active: 0,
            dead: 0,
            deadPercent: 0,
            ltfu: 0,
            ltfuPercent: 0,
            stopped: 0,
            stoppedPercent: 0,
            net: 0,
            netPercent: 0,
            to: 0,
            toPercent: 0,
        }
        for(let i = 0; i < result.length; i++) {
            if(result[i].artOutcome === 'Active') {
                data.active = data.active + parseInt(result[i].totalOutcomes)
            }
            if(result[i].artOutcome === 'Dead') {
                data.dead = data.dead + parseInt(result[i].totalOutcomes)
            }
            if(result[i].artOutcome === 'LTFU') {
                data.ltfu = data.ltfu + parseInt(result[i].totalOutcomes)
            }
            if(result[i].artOutcome === 'Stopped') {
                data.stopped = data.stopped + parseInt(result[i].totalOutcomes)
            }
        }
        if (data.active > 0) {
           data.deadPercent = ((data.dead/data.active)*100).toFixed(1);
           data.ltfuPercent = ((data.ltfu/data.active)*100).toFixed(1);
           data.stoppedPercent = ((data.stopped/data.active)*100).toFixed(1);
           data.netPercent = ((data.net/data.active)*100).toFixed(1);
           data.toPercent = ((data.to/data.active)*100).toFixed(1);
        }
        setTreatmentOutcomes(data);
    }, [filters]);

    const loadNewlyStartedARTTiles = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
        };
        const result = await getAll('care-treatment/getNewlyStartedDesegregated', params);
        let data = [ result.TotalStartedOnART ? result.TotalStartedOnART : 0 ];
        setNewlyStartedOnARTTiles({
            totalStartedOnART: data[0],
            totalStartedOnARTText: data[0].toLocaleString('en')
        });
    }, [filters]);

    useEffect(() => {
        loadTreatmentOutcomes();
        loadNewlyStartedARTTiles();
    }, [loadTreatmentOutcomes, loadNewlyStartedARTTiles]);

    return (
        <div className="row">
            <div className="col-3">
                <Card className="card-uploads-consistency-rates">
                    <CardHeader className="expected-uploads-header">
                        STARTED ART
                    </CardHeader>
                    <CardBody
                        className="align-items-center d-flex justify-content-center"
                        style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '265px' }}
                    >
                        <div className="col-12">
                            <span className="expected-uploads-text">{newlyStartedOnARTTiles.totalStartedOnARTText}</span>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className="col-9">
                <div className="row">
                    <div className="col-4">
                        <Card className="card-uploads-consistency-rates">
                            <CardHeader className="expected-uploads-header">
                                TRANSFERRED OUT
                            </CardHeader>
                            <CardBody
                                className="align-items-center d-flex justify-content-center"
                                style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                            >
                                <div className="col-12">
                                    <span className="expected-uploads-text">{treatmentOutcomes.to ? treatmentOutcomes.to.toLocaleString('en'):'0'}</span>
                                    <sup className="overall-rates-sup"> {treatmentOutcomes.toPercent ? treatmentOutcomes.toPercent:'0'}<span className="overall-rates-sup-perc"> %</span></sup>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-4">
                        <Card className="card-uploads-consistency-rates">
                            <CardHeader className="expected-uploads-header">
                                STOPPED ART
                            </CardHeader>
                            <CardBody
                                className="align-items-center d-flex justify-content-center"
                                style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                            >
                                <div className="col-12">
                                    <span className="expected-uploads-text">{treatmentOutcomes.stopped ? treatmentOutcomes.stopped.toLocaleString('en'):'0'}</span>
                                    <sup className="overall-rates-sup"> {treatmentOutcomes.stoppedPercent ? treatmentOutcomes.stoppedPercent:'0'}<span className="overall-rates-sup-perc"> %</span></sup>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-4">
                        <Card className="card-uploads-consistency-rates">
                            <CardHeader className="expected-uploads-header">
                                NET COHORT
                            </CardHeader>
                            <CardBody
                                className="align-items-center d-flex justify-content-center"
                                style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                            >
                                <div className="col-12">
                                    <span className="expected-uploads-text">{treatmentOutcomes.net ? treatmentOutcomes.net.toLocaleString('en'):'0'}</span>
                                    {/* <sup className="overall-rates-sup"> {treatmentOutcomes.netPercent ? treatmentOutcomes.netPercent:'0'}<span className="overall-rates-sup-perc"> %</span></sup> */}
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <Card className="card-uploads-consistency-rates">
                            <CardHeader className="expected-uploads-header">
                                ACTIVE ON ART
                            </CardHeader>
                            <CardBody
                                className="align-items-center d-flex justify-content-center"
                                style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                            >
                                <div className="col-12">
                                    <span className="expected-uploads-text">{treatmentOutcomes.active ? treatmentOutcomes.active.toLocaleString('en'):'0'}</span>
                                    {/* <sup className="overall-rates-sup"> {treatmentOutcomes.activePercent ? treatmentOutcomes.activePercent:'0'}<span className="overall-rates-sup-perc"> %</span></sup> */}
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-4">
                        <Card className="card-uploads-consistency-rates">
                            <CardHeader className="expected-uploads-header">
                                LOST TO FOLLOWUP
                            </CardHeader>
                            <CardBody
                                className="align-items-center d-flex justify-content-center"
                                style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                            >
                                <div className="col-12">
                                    <span className="expected-uploads-text">{treatmentOutcomes.ltfu ? treatmentOutcomes.ltfu.toLocaleString('en'):'0'}</span>
                                    <sup className="overall-rates-sup"> {treatmentOutcomes.ltfuPercent ? treatmentOutcomes.ltfuPercent:'0'}<span className="overall-rates-sup-perc"> %</span></sup>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-4">
                        <Card className="card-uploads-consistency-rates">
                            <CardHeader className="expected-uploads-header">
                                DEAD
                            </CardHeader>
                            <CardBody
                                className="align-items-center d-flex justify-content-center"
                                style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                            >
                                <div className="col-12" style={{ textAlign: 'center' }}>
                                    <span className="overall-rates-figure">{treatmentOutcomes.dead ? treatmentOutcomes.dead.toLocaleString('en'):'0'}</span>
                                    <sup className="overall-rates-sup"> {treatmentOutcomes.deadPercent}<span className="overall-rates-sup-perc"> %</span></sup>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TreatmentOutcomesOverview;