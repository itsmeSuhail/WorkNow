import { configureStore } from '@reduxjs/toolkit'
import UserDetailsReducer from './reducers/UserDetails.reducer'
import ExpereinceReducer from './reducers/Expereince.reducer'
import ProjectReducer from './reducers/Project.reducer'
import UserPointsReducer from './reducers/UserPoints.reducer'
import AppliedJobsReducer from './reducers/AppliedJobs.reducer'
export default configureStore({
    reducer:{
        details:UserDetailsReducer,
        experience:ExpereinceReducer,
        project:ProjectReducer,
        points:UserPointsReducer,
        appliedJob:AppliedJobsReducer

    }
})