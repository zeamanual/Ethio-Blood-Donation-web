import { Alert, Autocomplete, Box, Button, Grid, LinearProgress, MenuItem, Modal, Stack, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomProgressModal from '../components/customProgressModal'
import CustomResponseModal from '../components/customResponseModal'
import CustomResponseModalNoRoute from '../components/customResponseModalNoRoute'
import Layout from '../components/layout'
import { BLOODTYPES, CITIES } from '../constants'
import { createRequest, resetRequestFormStatus } from '../state/slices/requestSlice'
import StyledTextField from '../components/styledTextField'

function NewRequest() {
    let isAuthenticated = useSelector(state => state.user.isAuthenticated)
    let userState = useSelector(state => state.user)
    let router = useRouter()
    let dispatch = useDispatch()
    let requestState = useSelector(state => state.request)
    let [fieldsValue, setFieldsValue] = React.useState({
        bloodType: {
            value: userState.bloodType,
            errorMsg: ''
        },
        address: {
            value: [userState.address],
            errorMsg: ''
        },
        requiredBloodUnit: {
            value: 1,
            errorMsg: ''
        },
        specificLocationName: {
            value: "",
            errorMsg: ''
        },
        message: {
            value: "",
            errorMsg: ''
        },
    })

    React.useEffect(() => {
        if (!isAuthenticated) {
            router.push('login')
        }
        dispatch(resetRequestFormStatus())
    }, [isAuthenticated])

    let handleAddressChange = (e, value) => {
        let cityList = value.map(city => city.name)
        if (value < 1) {
            setFieldsValue((previousValue) => {
                return { ...previousValue, address: { value: [], errorMsg: "Address Can Not Be Empty" } }
            })
        } else {
            setFieldsValue((previousValue) => {
                return { ...previousValue, address: { value: cityList, errorMsg: "" } }
            })
        }
    }
    let handleBloodUnitChange = (e) => {
        if (!e.target.value) {
            setFieldsValue((previousValue) => {
                return { ...previousValue, requiredBloodUnit: { value: e.target.value, errorMsg: "Required Blood Unit Can Not Be Empty" } }
            })
        } else {
            if (parseInt(e.target.value) > 4) {
                setFieldsValue((previousValue) => {
                    return { ...previousValue, requiredBloodUnit: { value: e.target.value, errorMsg: "Required Blood Unit Can Not Exced 4 Units" } }
                })
            } else if (parseInt(e.target.value) <= 0) {
                setFieldsValue((previousValue) => {
                    return { ...previousValue, requiredBloodUnit: { value: e.target.value, errorMsg: "Required Blood Unit Must Be At Least 1 Unit" } }
                })
            } else {
                setFieldsValue((previousValue) => {
                    return { ...previousValue, requiredBloodUnit: { value: e.target.value, errorMsg: "" } }
                })
            }
        }
    }

    let handleBloodtypeChange = (e) => {
        if (!e.target.value) {
            setFieldsValue((previousValue) => {
                return { ...previousValue, bloodType: { value: e.target.value, errorMsg: "BloodType Can Not Be Empty" } }
            })
        } else {
            setFieldsValue((previousValue) => {
                return { ...previousValue, bloodType: { value: e.target.value, errorMsg: "" } }
            })
        }
    }

    let formSubmitHandler = (e) => {
        e.preventDefault();
        let isFormValid = true
        Object.keys(fieldsValue).forEach(fieldValue => {
            if (((!fieldsValue[fieldValue].value || fieldsValue[fieldValue].value?.length < 1) && (!['message', 'specificLocationName'].includes(fieldValue)))) {
                setFieldsValue(prev => ({
                    ...prev,
                    [fieldValue]: {
                        value: '',
                        errorMsg: `${fieldValue} Can Not Be Empty`
                    }
                }))
                isFormValid = false
            } else if (fieldsValue[fieldValue].errorMsg) {
                isFormValid = false
            }
        })
        if (isFormValid) {
            let requestData = {
                address: fieldsValue.address.value,
                bloodType: fieldsValue.bloodType.value,
                requiredBloodUnit: Number(fieldsValue.requiredBloodUnit.value),
                // specificLocationName:fieldsValue.specificLocationName.value,
                message: fieldsValue.message.value
            }

            dispatch(createRequest({ requestData, router }))
            
        } else {
            
        }
    }

    let modalCloseHadler = ()=>{
        dispatch(resetRequestFormStatus())
    }
    return (
        <Layout>
            {/* create request sucess modal */}
            <CustomResponseModal
                open={Boolean(requestState.newRequest.successMsg)}
                msg={requestState.newRequest.successMsg}
                path='/'
                btnName='Back To Home'
                severity={'success'}
            ></CustomResponseModal>
            <CustomResponseModalNoRoute
                open={Boolean(requestState.newRequest.errorMsg)}
                msg={requestState.newRequest.errorMsg}
                btnName='Back'
                severity={'error'}
                onCloseCallBack={modalCloseHadler}
            ></CustomResponseModalNoRoute>

            <Box sx={{ mx: { xl: 10, md: 10, xs: 3 },minHeight:'80vh',mt:14, boxShadow: 10, borderRadius: 2 }}>
                <CustomProgressModal
                    message={'Creating New Request'}
                    open={requestState.loading}
                >
                </CustomProgressModal>
                <Box sx={{ padding: 4 }}>

                    <form onSubmit={formSubmitHandler}>
                        <Stack gap={2} direction={'column'}>
                            <Box display={'flex'} m={{ md: 4, xs: 2 }} justifyContent={'center'}>
                                <Typography align='center' variant='h4' >Enter The Details Of Your Request</Typography>
                            </Box>
                            <Stack gap={2} direction={{ xs: 'column', md: 'row' }}>
                                <StyledTextField
                                    fullWidth
                                    error={Boolean(fieldsValue.bloodType.errorMsg)}
                                    helperText={fieldsValue.bloodType.errorMsg}
                                    label='Blood Type'
                                    value={fieldsValue.bloodType.value}
                                    onChange={handleBloodtypeChange}
                                    select
                                >
                                    {
                                        BLOODTYPES.map((bloodType) => {
                                            return <MenuItem key={bloodType} value={bloodType} >{bloodType}</MenuItem>
                                        })
                                    }
                                </StyledTextField>
                                <StyledTextField
                                    error={Boolean(fieldsValue.requiredBloodUnit.errorMsg)}
                                    helperText={fieldsValue.requiredBloodUnit.errorMsg}
                                    fullWidth
                                    label='Required Blood Unit'
                                    value={fieldsValue.requiredBloodUnit.value}
                                    type={'number'}
                                    onChange={handleBloodUnitChange}
                                    sx={{
                                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                          borderColor: theme => 'yellow',
                                        },
                                      }}
                                    
                                >
                                </StyledTextField>

                            </Stack>

                            <Autocomplete
                                multiple
                                id="tags-standard"
                                options={CITIES}
                                defaultValue={[{ name: userState.address }]}
                                isOptionEqualToValue={(option, value) => { return option.name == value.name }}
                                onChange={handleAddressChange}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => (
                                    <StyledTextField
                                        {...params}
                                        error={Boolean(fieldsValue.address.errorMsg)}
                                        helperText={fieldsValue.address.errorMsg ? fieldsValue.address.errorMsg : "You can selected more than one near by location to have more avaliable donors"}
                                        label="Request Locations"
                                        placeholder='locaion'

                                    ></StyledTextField>
                                )}
                            >

                            </Autocomplete>
                            <StyledTextField
                                helperText={'Enter Your Specific Location Name, If It Is Not Avaliable On The Above List'}
                                label="Specific Location Name ( Optional )"
                                value={fieldsValue.specificLocationName.value}
                                onChange={(e) => setFieldsValue(prev => ({ ...prev, specificLocationName: { value: e.target.value, errorMsg: "" } }))}
                            >
                            </StyledTextField>
                            <StyledTextField
                                label="Message ( Optional )"
                                value={fieldsValue.message.value}
                                onChange={(e) => setFieldsValue(prev => ({ ...prev, message: { value: e.target.value, errorMsg: "" } }))}
                                multiline
                                rows={3}
                                sx={{ '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'secondary.main' } }}
                            >
                            </StyledTextField>
                            <Box display={'flex'} alignItems='center' flexDirection={'column'} justifyContent={'center'}>
                                <Button type="submit" variant='contained'>Create Request</Button>
                            </Box>
                        </Stack>

                    </form>
                </Box>
            </Box>
        </Layout>
    )
}

export default NewRequest