export function numberSeparator(num:number):string | number {
	if (
		num
	) {
		const arr = num.toString().split(".");
		const integerPart = arr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return arr[1] ? `${integerPart}.${arr[1]}` : integerPart;
	} 
	return num;
	
}