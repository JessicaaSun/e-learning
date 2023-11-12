import { createSlice} from "@reduxjs/toolkit";

const certificateSlice = createSlice({
    name: 'certificate',
    initialState: {
        certificate: [],
    },
})

// export reducer
export default certificateSlice.reducer

// export selectors
export const selectAllCertificate = state => state.certificate.certificate