
import axios from 'axios';
import swal from 'sweetalert2';
const intiState=()=>{
	flights:axios.get("localhost:44375/api/GetAvailableFlights").catch(err=>{
		console.log(err);
		swal.fire({
			title:'error',
			icon:"warning",
			showConfirmButton:true,
			confirmButtonText:'OK'
		})
	})
	
}

const flightReducer=(state=intiState,action)=>{
	console.log(action.type);
	switch(action.type)
	{	
		default:
			return state;
	}
}
export default flightReducer;