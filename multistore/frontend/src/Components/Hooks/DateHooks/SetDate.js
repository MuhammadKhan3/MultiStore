const useDate=()=>{
  let date=new Date();
  let  day=date.getDay();
  let  month=date.getMonth();
  let year=date.getFullYear()
  date=year+'-'+month+'-'+day;
  return{
    date:date,
   }
}
export default useDate;