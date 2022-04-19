
const errorsfun=(name,errors)=>{
    return errors.data.map((value,index)=>{
    return  value.param===name && <div key={index} className="alert alert-danger" role="alert">{value.msg}</div>; 
    })
}
export default  errorsfun;