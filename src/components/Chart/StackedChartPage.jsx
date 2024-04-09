import { useContext, useEffect } from "react";

import StackedChart from "../Chart/StackedChart";
import ViewDataStacked from "./ViewDataStacked";
import { CrudStackedChartModal } from "./ChartModal";
import { CustomContext } from "../CustomContext";
import CustomToast from "../ToastComponent/CustomToast";
import titles from '../../pageTitle';

const StackedChartPage = () => {

    const { addDataCrud, setaddDataCrud, setIsEdit, showToast } = useContext(CustomContext);

    useEffect(()=>{
        document.title = titles.stackedChart;
    },[])

    return (
        <>
            <h2>Stacked Chart</h2>

            <div className="card chart-page-card chart-page-card1">
                <StackedChart
                    chartId="stacked4"
                    parentWidth="100%"
                    parentHeight="100%"
                    borderSize="0"
                    isModal={true}
                    tooltipShow={true}
                    showLegend={true}
                    showLables={true}
                />
            </div>

            <h4 className='mt-5 mb-2'>Stacked Chart Tabular Data</h4>
            <div className="header-crud w-100 d-flex justify-content-between mb-3">
                <h6>Stacked Chart</h6>
                <button className='data-add-btn' onClick={() => { setaddDataCrud(true); setIsEdit(false) }}>Add</button>
            </div>
            {/* <ViewDataStacked /> */}

            {/* {addDataCrud ? (
                <CrudStackedChartModal
                    show={addDataCrud}
                    onHide={() => setaddDataCrud(false)}
                />
            ) : null} */}

            {showToast ? <CustomToast /> : null}

        </>
    )
}

export default StackedChartPage;