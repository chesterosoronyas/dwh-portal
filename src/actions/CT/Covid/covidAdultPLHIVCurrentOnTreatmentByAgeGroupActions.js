import * as actionTypes from '../../types';
import moment from 'moment';
import { getAll } from '../../../views/Shared/Api';
import { CACHING, PAGES } from '../../../constants';

export const loadCovidAdultPLHIVCurrentOnTreatmentByAgeGroup = () => async (dispatch, getState) => {
    if (getState().filters.noCache === true) {
        await dispatch(fetchCovidAdultPLHIVCurrentOnTreatmentByAgeGroup());
    } else {
        const diffInMinutes = moment().diff(
            moment(getState().CovidAdultPLHIVCurrentOnTreatmentByAgeGroup.lastFetch),
            'minutes'
        );
        if (
            getState().ui.ctTab !== 'covid' &&
            getState().ui.currentPage !== PAGES.home &&
            getState().ui.currentPage !== PAGES.ct
        ) {
            return;
        }
        else if ((diffInMinutes < CACHING.MID) && getState().filters.filtered === false) {
            return;
        } else {
            await dispatch(fetchCovidAdultPLHIVCurrentOnTreatmentByAgeGroup());
        }
    }
};

export const fetchCovidAdultPLHIVCurrentOnTreatmentByAgeGroup = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_COVID_ADULT_PLHIV_CURRENT_ON_TREATMENT_BY_AGE_GROUP_REQUEST });
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
    const response = await getAll('care-treatment/getCovidAdultPLHIVCurrentOnTreatmentByAgeGroup', params);
    dispatch({ type: actionTypes.CT_COVID_ADULT_PLHIV_CURRENT_ON_TREATMENT_BY_AGE_GROUP_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
