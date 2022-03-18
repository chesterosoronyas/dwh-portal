import React, { useEffect, useState, useCallback } from 'react';
import moment from 'moment';
import { DateInput } from 'semantic-ui-calendar-react';
import { Dropdown } from 'semantic-ui-react';
import { PAGES } from "../../constants";
import { Row, Col } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from "../../actions/Shared/filterActions";
import * as ctSelectors from '../../selectors/Shared/ctSitesSelector';

const CovidFilter = () => {
    const dispatch = useDispatch();

    const filters = useSelector(state => state.filters);
    const ui = useSelector(state => state.ui);

    const [counties, setCounties] = useState([]);
    const [subCounties, setSubCounties] = useState([]);
    const [facilities, setFacilities] = useState([]);
    const [partners, setPartners] = useState([]);
    const [agencies, setAgencies] = useState([]);
    const [projects, setProjects] = useState([]);
    const [genders, setGenders] = useState([]);
    const [datimAgeGroups, setDatimAgeGroups] = useState([]);
    const [populationTypes, setPopulationTypes] = useState([]);
    const [latestPregnancies, setLatestPregnancies] = useState([]);

    const ctCounties = useSelector(ctSelectors.getCounties);
    const ctSubCounties = useSelector(ctSelectors.getSubCounties);
    const ctFacilities = useSelector(ctSelectors.getFacilities);
    const ctPartners = useSelector(ctSelectors.getPartners);
    const ctAgencies = useSelector(ctSelectors.getAgencies);
    const ctProjects = useSelector(ctSelectors.getProjects);

    const loadSites = useCallback(async () => {
        switch(ui.currentPage) {
            case PAGES.home:
                setCounties(ctCounties.map(c => ({ value: c, key: c, text: c })));
                setSubCounties(ctSubCounties.map(s => ({ value: s, key: s, text: s })));
                setFacilities(ctFacilities.map(f => ({ value: f, key: f, text: f })));
                setPartners(ctPartners.map(p => ({ value: p, key: p, text: p })));
                setAgencies(ctAgencies.map(a => ({ value: a, key: a, text: a })));
                setProjects(ctProjects.map(p => ({ value: p, key: p, text: p })));
                break;
            case PAGES.ct:
                setCounties(ctCounties.map(c => ({ value: c, key: c, text: c })));
                setSubCounties(ctSubCounties.map(s => ({ value: s, key: s, text: s })));
                setFacilities(ctFacilities.map(s => ({ value: s, key: s, text: s })));
                setPartners(ctPartners.map(p => ({ value: p, key: p, text: p })));
                setAgencies(ctAgencies.map(a => ({ value: a, key: a, text: a })));
                setProjects(ctProjects.map(p => ({ value: p, key: p, text: p })));
                break;
        }
        setGenders(['Male', 'Female'].map(c => ({ value: c, key: c, text: c })));
        setDatimAgeGroups([
            'Under 1',
            '1 to 4',
            '5 to 9',
            '10 to 14',
            '15 to 19',
            '20 to 24',
            '25 to 29',
            '30 to 34',
            '35 to 39',
            '40 to 44',
            '45 to 49',
            '50 to 54',
            '55 to 59',
            '60 to 64',
            '65+'
        ].map(c => ({ value: c, key: c, text: c })));
        setPopulationTypes([
            ' FSW',
            ' General Population',
            ' MSM',
            ' PWID',
            'General Population',
            'Key population',
        ].map(c => ({ value: c, key: c, text: c })));
        setLatestPregnancies([
            'LIVE BIRTH',
            'No',
            'RECENTLY MISCARRIAGED',
            'UNKNOWN',
            'YES',
        ].map(c => ({ value: c, key: c, text: c })));
    }, [
        ui,


        ctCounties,
        ctSubCounties,
        ctFacilities,
        ctPartners,
        ctAgencies,
        ctProjects,
    ]);

    useEffect(() => {
        loadSites();
    }, [loadSites]);

    return (
        <>
            <Row>
                {
                    filters.countyFilterEnabled ?
                    <Col className={"col-2"}>
                        <div className="form-group">
                            <label htmlFor="county">County</label>
                            <Dropdown
                                id="county"
                                name="county"
                                placeholder="Select County"
                                fluid
                                multiple
                                selection
                                search
                                options={counties}
                                value={filters.counties}
                                onChange={(e, data) => {
                                    dispatch(actions.filterByCounty(data.value));
                                }}
                            />
                        </div>
                    </Col> : null
                }
                {
                    filters.subCountyFilterEnabled ?
                    <Col className={"col-2"}>
                        <div className="form-group">
                            <label htmlFor="county">Sub-County</label>
                            <Dropdown
                                id="subCounty"
                                name="subCounty"
                                placeholder="Select Sub-County"
                                fluid
                                multiple
                                selection
                                search
                                options={subCounties}
                                value={filters.subCounties}
                                onChange={(e, data) => {
                                    dispatch(actions.filterBySubCounty(data.value));
                                }}
                            />
                        </div>
                    </Col> : null
                }
                {
                    filters.facilityFilterEnabled ?
                    <Col className={"col-2"}>
                        <div className="form-group">
                            <label htmlFor="county">Facility</label>
                            <Dropdown
                                id="facility"
                                name="facility"
                                placeholder="Select Facility"
                                fluid
                                multiple
                                selection
                                search
                                options={facilities}
                                value={filters.facilities}
                                onChange={(e, data) => {
                                    dispatch(actions.filterByFacility(data.value));
                                }}
                            />
                        </div>
                    </Col> : null
                }
                {
                    filters.partnerFilterEnabled ?
                    <Col className={"col-2"}>
                        <div className="form-group">
                            <label htmlFor="partner">Service Delivery Partner</label>
                            <Dropdown
                                id="partner"
                                name="partner"
                                placeholder="Select Partner"
                                fluid
                                multiple
                                selection
                                search
                                options={partners}
                                value={filters.partners}
                                onChange={(e, data) => {
                                    dispatch(actions.filterByPartner(data.value));
                                }}
                            />
                        </div>
                    </Col> : null
                }
                {
                    filters.agencyFilterEnabled ?
                    <Col className={"col-2"}>
                        <div className="form-group">
                            <label htmlFor="agency">Agency</label>
                            <Dropdown
                                id="agency"
                                name="agency"
                                placeholder="Select Agency"
                                fluid
                                multiple
                                selection
                                search
                                options={agencies}
                                value={filters.agencies}
                                onChange={(e, data) => {
                                    dispatch(actions.filterByAgency(data.value));
                                }}
                            />
                        </div>
                    </Col> : null
                }
                {
                    filters.projectFilterEnabled ?
                    <Col className={"col-2"}>
                        <div className="form-group">
                            <label htmlFor="project">Project</label>
                            <Dropdown
                                id="project"
                                name="project"
                                placeholder="Select Project"
                                fluid
                                multiple
                                selection
                                search
                                options={projects}
                                value={filters.projects}
                                onChange={(e, data) => {
                                    dispatch(actions.filterByProject(data.value));
                                }}
                            />
                        </div>
                    </Col> : null
                }
                {
                    filters.fromDateFilterEnabled ?
                    <Col className={"col-2"}>
                        <div className="form-group">
                            <label htmlFor="fromDate">{filters.toDateFilterEnabled ? 'From':'Period'}</label>
                            <DateInput
                                name="fromDate"
                                dateFormat="MMM YYYY"
                                closable={true}
                                clearable={true}
                                maxDate={moment()}
                                placeholder={filters.toDateFilterEnabled ? 'From':'Period'}
                                fluid
                                value={filters.fromDate}
                                iconPosition="left"
                                onChange={(e, data) => {
                                    dispatch(actions.filterByFromDate(data.value));
                                }}
                            />
                        </div>
                    </Col> : null
                }
                {
                    filters.toDateFilterEnabled ?
                    <Col className={"col-2"}>
                        <div className="form-group">
                            <label htmlFor="toDate">To</label>
                            <DateInput
                                name="toDate"
                                dateFormat="MMM YYYY"
                                closable={true}
                                clearable={true}
                                minDate={filters.fromDate}
                                maxDate={moment()}
                                placeholder="To"
                                fluid
                                value={filters.toDate}
                                iconPosition="left"
                                onChange={(e, data) => {
                                    dispatch(actions.filterByToDate(data.value));
                                }}
                            />
                        </div>
                    </Col> : null
                }
                {
                    filters.genderFilterEnabled ?
                        <Col className={"col-2"}>
                            <div className="form-group">
                                <label htmlFor="gender">Sex</label>
                                <Dropdown
                                    id="gender"
                                    name="gender"
                                    placeholder="Select Sex"
                                    fluid
                                    multiple
                                    selection
                                    search
                                    options={genders}
                                    value={filters.genders}
                                    onChange={(e, data) => {
                                        dispatch(actions.filterByGender(data.value));
                                    }}
                                />
                            </div>
                        </Col> : null
                }
                {
                    filters.datimAgeGroupFilterEnabled ?
                        <Col className={"col-2"}>
                            <div className="form-group">
                                <label htmlFor="datimAgeGroup">Age</label>
                                <Dropdown
                                    id="datimAgeGroup"
                                    name="datimAgeGroup"
                                    placeholder="Select Age"
                                    fluid
                                    multiple
                                    selection
                                    search
                                    options={datimAgeGroups}
                                    value={filters.datimAgeGroups}
                                    onChange={(e, data) => {
                                        dispatch(actions.filterByDatimAgeGroup(data.value));
                                    }}
                                />
                            </div>
                        </Col> : null
                }
            </Row>
            <Row>

            </Row>
        </>
    );
};

export default CovidFilter;
