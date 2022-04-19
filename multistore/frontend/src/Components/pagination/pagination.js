import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link} from 'react-router-dom';
import { paginationThunk } from '../StoreSlice/paginationslice/paginationslice';
import './pagination.css'
const Pagination=()=>{
const pagination=useSelector(state=>state.paginationslice.pagination)
const [clicked,setclicked]=useState(1)
const dispatch=useDispatch();
const [flag,setflag]=useState(false);



const clickedfun=(e)=>{
e.preventDefault()
setclicked(e.target.parentNode.value);
// history.push(`EditProduct?page=${e.target.parentNode.value}`)
Pagination();
}

const Pagination=()=>{
  const params=new URLSearchParams(window.location.search)
  const get=params.get('page');
  dispatch(paginationThunk(get));
  console.log(get);
  setclicked(Number(get));
} 
// Pagination();
useEffect(()=>{
  Pagination()
},[])

return(<nav className="pagination-container" aria-label="...">
<ul className="pagination">
  {pagination.prevpage && <li className="page-item" value={pagination.haspreviouspage} onClick={clickedfun}><Link  className="page-link"  to={`?page=${pagination.haspreviouspage}`}>Prev</Link></li>}
  {pagination.prevpage && <li className={`page-item ${clicked===pagination.haspreviouspage ? "active":""}`} value={pagination.haspreviouspage} onClick={clickedfun}><Link  className="page-link"  to={`?page=${pagination.haspreviouspage}`}>{pagination.haspreviouspage}</Link></li>}
  <li className={`page-item ${clicked===pagination.currentpage ? "active":""}`} value={pagination.currentpage} onClick={clickedfun} id='currentpage'  aria-current="page">
    <Link className="page-link" to={`?page=${pagination.currentpage}`}>{pagination.currentpage}</Link>
  </li>
  {pagination.nextpage && <li id='nextpage' className={`page-item ${clicked===pagination.hasnextpage ? 'active': ''}`} onClick={clickedfun} value={pagination.hasnextpage}  ><Link className="page-link" to={`?page=${pagination.hasnextpage}`}>{pagination.hasnextpage}</Link></li>}
  {pagination.nextpage && <li id='nextpage' className="page-item" onClick={clickedfun} value={pagination.hasnextpage}  ><Link className="page-link" to={`?page=${pagination.hasnextpage}`}>Next</Link></li>}
</ul>
</nav>);
}
export default Pagination;