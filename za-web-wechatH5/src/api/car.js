import http from '@/utils/http'


export function loanDetailsApi(data) {
	return http({
		url: 'loan/details',
		method: 'get',
		params: data,
	})
}