import * as actionTypes from '../../types';
import moment from 'moment';
import { getAll } from '../../../views/Shared/Api';
import { CACHING, PAGES } from '../../../constants';

export const loadCovidAdmissionSymptomaticByAge = () => async (dispatch, getState) => {
    if (getState().filters.noCache === true) {
        await dispatch(fetchCovidAdmissionSymptomaticByAge());
    } else {
        const diffInMinutes = moment().diff(
            moment(getState().CovidAdmissionSymptomaticByAge.lastFetch),
            'minutes'
        );
        if (
            getState().ui.ctTab !== 'covid' &&
            getState().ui.currentPage !== PAGES.home
        ) {
            return;
        }
        else if ((diffInMinutes < CACHING.MID) && getState().filters.filtered === false) {
            return;
        } else {
            await dispatch(fetchCovidAdmissionSymptomaticByAge());
        }
    }
};

export const fetchCovidAdmissionSymptomaticByAge = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_COVID_ADMISSION_SYMPTOMATIC_PATIENTS_BY_AGE_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects,
        gender: getState().filters.genders,
        datimAgeGroup: getState().filters.datimAgeGroups,
        year: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("YYYY") : '',
        month: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("MM") : '',
    };
    const response = await getAll('care-treatment/getCovidAdmissionByAge', params);
    dispatch({ type: actionTypes.CT_COVID_ADMISSION_SYMPTOMATIC_PATIENTS_BY_AGE_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};

