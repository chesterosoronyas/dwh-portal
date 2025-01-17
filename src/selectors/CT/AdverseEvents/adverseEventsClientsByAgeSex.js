import { createSelector } from 'reselect';

const listUnfiltered = state => state.adverseEventsClientsByAgeSex.listUnfiltered;
const listFiltered = state => state.adverseEventsClientsByAgeSex.listFiltered;
const filtered = state => state.filters.filtered;

export const getAdverseEventsClientsByAgeSex = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let ageGroups = [
            "Under 1",
            "1 to 4",
            "5 to 9",
            "10 to 14",
            "15 to 19",
            "20 to 24",
            "25 to 29",
            "30 to 34",
            "35 to 39",
            "40 to 44",
            "45 to 49",
            "50 to 54",
            "55 to 59",
            "60 to 64",
            "65+"
        ];
        let adverseEventsMale = [];
        let adverseEventsFemale = [];
        
        for (let i = 0; i < list.length; i++) {
            if (list[i].Gender.toLowerCase() === "M".toLowerCase() || list[i].Gender.toLowerCase() === "Male".toLowerCase()) {
                let index = ageGroups.indexOf(list[i].AgeGroup);
                adverseEventsMale.splice(index, 0, parseInt(list[i].total));
            } else if (list[i].Gender.toLowerCase() === "F".toLowerCase() || list[i].Gender.toLowerCase() === "Female".toLowerCase()) {
                let index = ageGroups.indexOf(list[i].AgeGroup);
                adverseEventsFemale.splice(index, 0, parseInt(list[i].total));
            }
        }

        return { ageGroups, adverseEventsFemale, adverseEventsMale };
    }
);

export const getAdverseEventsClientsByAgeSexChildren = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let ageGroups = [
            "Under 1",
            "1 to 4",
            "5 to 9",
            "10 to 14",
            // "15 to 19",
            // "20 to 24",
            // "25 to 29",
            // "30 to 34",
            // "35 to 39",
            // "40 to 44",
            // "45 to 49",
            // "50 to 54",
            // "55 to 59",
            // "60 to 64",
            // "65+"
        ];
        let adverseEventsMale = [];
        let adverseEventsFemale = [];
        
        for (let i = 0; i < list.length; i++) {
            if (list[i].Gender.toLowerCase() === "M".toLowerCase() || list[i].Gender.toLowerCase() === "Male".toLowerCase()) {
                let index = ageGroups.indexOf(list[i].AgeGroup);
                if(index === -1) {
                    continue;
                }
                adverseEventsMale.splice(index, 0, parseInt(list[i].total));
            } else if (list[i].Gender.toLowerCase() === "F".toLowerCase() || list[i].Gender.toLowerCase() === "Female".toLowerCase()) {
                let index = ageGroups.indexOf(list[i].AgeGroup);
                if(index === -1) {
                    continue;
                }
                adverseEventsFemale.splice(index, 0, parseInt(list[i].total));
            }
        }

        return { ageGroups, adverseEventsFemale, adverseEventsMale };
    }
);

export const getAdverseEventsClientsByAgeSexAdults = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let ageGroups = [
            // "Under 1",
            // "1 to 4",
            // "5 to 9",
            // "10 to 14",
            "15 to 19",
            "20 to 24",
            "25 to 29",
            "30 to 34",
            "35 to 39",
            "40 to 44",
            "45 to 49",
            "50 to 54",
            "55 to 59",
            "60 to 64",
            "65+"
        ];
        let adverseEventsMale = [];
        let adverseEventsFemale = [];
        
        for (let i = 0; i < list.length; i++) {
            if (list[i].Gender.toLowerCase() === "M".toLowerCase() || list[i].Gender.toLowerCase() === "Male".toLowerCase()) {
                let index = ageGroups.indexOf(list[i].AgeGroup);
                if(index === -1) {
                    continue;
                }
                adverseEventsMale.splice(index, 0, parseInt(list[i].total));
            } else if (list[i].Gender.toLowerCase() === "F".toLowerCase() || list[i].Gender.toLowerCase() === "Female".toLowerCase()) {
                let index = ageGroups.indexOf(list[i].AgeGroup);
                if(index === -1) {
                    continue;
                }
                adverseEventsFemale.splice(index, 0, parseInt(list[i].total));
            }
        }

        return { ageGroups, adverseEventsFemale, adverseEventsMale };
    }
);

export const getAdverseEventsClientsBySex = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let adverseEventsMale = 0;
        let adverseEventsFemale = 0;
        
        for (let i = 0; i < list.length; i++) {
            if (list[i].Gender.toLowerCase() === "M".toLowerCase() || list[i].Gender.toLowerCase() === "Male".toLowerCase()) {
                adverseEventsMale = adverseEventsMale + parseInt(list[i].total);
            } else if (list[i].Gender.toLowerCase() === "F".toLowerCase() || list[i].Gender.toLowerCase() === "Female".toLowerCase()) {
                adverseEventsFemale = adverseEventsFemale + parseInt(list[i].total);
            }
        }

        return { adverseEventsFemale, adverseEventsMale };
    }
);

export const getAdverseEventsClientsByAgeSexList = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        return list;
    }
);

export const getAdverseEventsClientsAdults = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let ageGroups = [
            // "Under 1",
            // "1 to 4",
            // "5 to 9",
            // "10 to 14",
            "15 to 19",
            "20 to 24",
            "25 to 29",
            "30 to 34",
            "35 to 39",
            "40 to 44",
            "45 to 49",
            "50 to 54",
            "55 to 59",
            "60 to 64",
            "65+"
        ];
        let adverseEventsMale = 0;
        let adverseEventsFemale = 0;
        
        for (let i = 0; i < list.length; i++) {
            if (list[i].Gender.toLowerCase() === "M".toLowerCase() || list[i].Gender.toLowerCase() === "Male".toLowerCase()) {
                let index = ageGroups.indexOf(list[i].AgeGroup);
                if(index === -1) {
                    continue;
                }
                adverseEventsMale = adverseEventsMale + parseInt(list[i].total, 10);
            } else if (list[i].Gender.toLowerCase() === "F".toLowerCase() || list[i].Gender.toLowerCase() === "Female".toLowerCase()) {
                let index = ageGroups.indexOf(list[i].AgeGroup);
                if(index === -1) {
                    continue;
                }
                adverseEventsFemale = adverseEventsFemale + parseInt(list[i].total, 10);
            }
        }

        let adverseEvents = adverseEventsFemale + adverseEventsMale;

        return { ageGroups, adverseEvents, adverseEventsFemale, adverseEventsMale };
    }
);

export const getAdverseEventsClientsAdolescents = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let ageGroups = [
            // "Under 1",
            // "1 to 4",
            // "5 to 9",
            "10 to 14",
            "15 to 19",
            // "20 to 24",
            // "25 to 29",
            // "30 to 34",
            // "35 to 39",
            // "40 to 44",
            // "45 to 49",
            // "50 to 54",
            // "55 to 59",
            // "60 to 64",
            // "65+"
        ];
        let adverseEventsMale = 0;
        let adverseEventsFemale = 0;
        
        for (let i = 0; i < list.length; i++) {
            if (list[i].Gender.toLowerCase() === "M".toLowerCase() || list[i].Gender.toLowerCase() === "Male".toLowerCase()) {
                let index = ageGroups.indexOf(list[i].AgeGroup);
                if(index === -1) {
                    continue;
                }
                adverseEventsMale = adverseEventsMale + parseInt(list[i].total, 10);
            } else if (list[i].Gender.toLowerCase() === "F".toLowerCase() || list[i].Gender.toLowerCase() === "Female".toLowerCase()) {
                let index = ageGroups.indexOf(list[i].AgeGroup);
                if(index === -1) {
                    continue;
                }
                adverseEventsFemale = adverseEventsFemale + parseInt(list[i].total, 10);
            }
        }

        let adverseEvents = adverseEventsFemale + adverseEventsMale;
        
        return { ageGroups, adverseEvents, adverseEventsFemale, adverseEventsMale };
    }
);

export const getAdverseEventsClientsChildren = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        let ageGroups = [
            "Under 1",
            "1 to 4",
            "5 to 9",
            "10 to 14",
            // "15 to 19",
            // "20 to 24",
            // "25 to 29",
            // "30 to 34",
            // "35 to 39",
            // "40 to 44",
            // "45 to 49",
            // "50 to 54",
            // "55 to 59",
            // "60 to 64",
            // "65+"
        ];
        let adverseEventsMale = 0;
        let adverseEventsFemale = 0;
        
        for (let i = 0; i < list.length; i++) {
            if (list[i].Gender.toLowerCase() === "M".toLowerCase() || list[i].Gender.toLowerCase() === "Male".toLowerCase()) {
                let index = ageGroups.indexOf(list[i].AgeGroup);
                if(index === -1) {
                    continue;
                }
                adverseEventsMale = adverseEventsMale + parseInt(list[i].total, 10);
            } else if (list[i].Gender.toLowerCase() === "F".toLowerCase() || list[i].Gender.toLowerCase() === "Female".toLowerCase()) {
                let index = ageGroups.indexOf(list[i].AgeGroup);
                if(index === -1) {
                    continue;
                }
                adverseEventsFemale = adverseEventsFemale + parseInt(list[i].total, 10);
            }
        }

        let adverseEvents = adverseEventsFemale + adverseEventsMale;
        
        return { ageGroups, adverseEvents, adverseEventsFemale, adverseEventsMale };
    }
);