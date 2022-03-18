import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Spinner } from 'reactstrap';
import { formatNumber, roundNumber } from '../../../utils/utils';
import * as artOptimizationOverviewSelectors from '../../../selectors/CT/ArtOptimization/artOptimizationOverview';
import DataCardCT from '../../Shared/DataCardCT';

const ChildArtOptimizationOverview = () => {
    const loading = useSelector(state => state.artOptimizationOverview.loading);
    const children = useSelector(artOptimizationOverviewSelectors.getChildren);
    const childrenOnFirstLine = useSelector(artOptimizationOverviewSelectors.getChildrenOnFirstLine);
    const childrenOnFirstLinePercent = children ? (childrenOnFirstLine/children)*100 : 0;
    const childrenOnSecondLine = useSelector(artOptimizationOverviewSelectors.getChildrenOnSecondLine);
    const childrenOnSecondLinePercent = children ? (childrenOnSecondLine/children)*100 : 0;
    const childrenOnThirdLine = useSelector(artOptimizationOverviewSelectors.getChildrenOnThirdLine);
    const childrenOnThirdLinePercent = children ? (childrenOnThirdLine/children)*100 : 0;

    const childrenOnUndocumentedLine = useSelector(artOptimizationOverviewSelectors.getChildrenOnUndocumentedLine);
    const childrenOnUndocumentedLinePercent = children ? (childrenOnUndocumentedLine/children)*100 : 0;

    return (
        <span>
            <Row>
                <Col>
                    {
                        loading === true ?
                        <Spinner/> :
                        <DataCardCT
                            title="CALHIV ON FIRST LINE"
                            subtitle={roundNumber(childrenOnFirstLinePercent) + "%"}
                            data={formatNumber(childrenOnFirstLine)}
                        />
                    }
                </Col>
                <Col>
                    {
                        loading === true ?
                        <Spinner/> :
                            <DataCardCT
                            title="CALHIV ON SECOND LINE"
                            subtitle={roundNumber(childrenOnSecondLinePercent) + "%"}
                            data={formatNumber(childrenOnSecondLine)}
                        />
                    }
                </Col>
                <Col>
                    {
                        loading === true ?
                        <Spinner/> :
                        <DataCardCT
                            title="CALHIV ON THIRD LINE"
                            subtitle={roundNumber(childrenOnThirdLinePercent) + "%"}
                            data={formatNumber(childrenOnThirdLine)}
                        />
                    }
                </Col>
            </Row>
            <Row>
                <Col>
                    {
                        loading === true ?
                        <Spinner/> :
                        <DataCardCT
                            title="CALHIV ON UNDOCUMENTED LINE"
                            subtitle={roundNumber(childrenOnUndocumentedLinePercent) + "%"}
                            data={formatNumber(childrenOnUndocumentedLine)}
                        />
                    }
                </Col>
                <Col>
                    &nbsp;
                </Col>
                <Col>
                    &nbsp;
                </Col>
            </Row>
        </span>
    );
};

export default ChildArtOptimizationOverview;
