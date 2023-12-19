import { Fragment } from "react";
import './Filter.css'

interface FilterProps {
    onFilter: (filter: string) => void;
    count: number;
    filter: string;

  }

const Filter: React.FC<FilterProps> =({onFilter, count,filter})=>{



    return(
        <Fragment>
            {/* filter logic, according to active, completed, all, also clear all button */}
            <div className='container filter-bar'>
                <div className="row">
                    <div className="col-md-3">
                        {/* count items that are not yet done */}
                        {count}:items left
                    </div>
                    <div className="col-md-5">
                        <a className="clickable-tags" style={{color :filter ==='All'? 'blue' : 'grey'}} type="button" onClick={() => onFilter('All')}> All</a>
                        <a className="clickable-tags" style={{color :filter ==='Active'? 'blue' : 'grey'}} type="button" onClick={() => onFilter('Active')}>Active</a>
                        <a className="clickable-tags" style={{color :filter ==='Completed'? 'blue' : 'grey'}} type="button" onClick={() => onFilter('Completed')}>Completed</a>
                    </div>
                    <div className="col-md-4">
                        <a  className= "clickable-tags" style={{color :filter ==='Clear'? 'blue' : 'grey'}} type="button" onClick={()=>onFilter('Clear')}>
                        Clear Completed</a></div>
                </div>
            </div>
        </Fragment>
    )
}
export default Filter;