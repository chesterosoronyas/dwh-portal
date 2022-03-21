import moment from 'moment';
import { CACHING, PAGES } from '../../../constants';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';

export const loadCalHIVCurrentOnArt = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().CALHIVCurrentOnArt.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'ovc' &&
        getState().ui.currentPage !== PAGES.ct) {
        return;
    }
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchCALHIVCurrentOnArt());
    }
}

export const fetchCALHIVCurrentOnArt = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_CALHIV_CURRENT_ON_ART_REQUEST });
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
    const response = await getAll('care-treatment/getCALHIVOnArt', params);
    dispatch({ type: actionTypes.CT_CALHIV_CURRENT_ON_ART_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
