import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import customizationReducer from "./slices/CustomizationSLice";
import loginSliceReducer from "./slices/LoginSlice";
import roleSliceReducer from "./slices/RoleSlice";
import userSliceReducer from "./slices/UserSlice";
import employeeSliceReducer from "./slices/EmployeeSlice";
import salutationSliceReducer from "./slices/SalutationSlice";
import permissionSliceReducer from "./slices/PermissionSlice";
import attendanceSliceReducer from "./slices/AttendanceSlice";
import dashboardSliceReducer from "./slices/DashboardSlice";
import companySliceReducer from "./slices/CompanySlice";
import designationSliceReducer from "./slices/DesignationSlice";
import leaveRequestSliceReducer from "./slices/LeavesRequestSlice";
import leaveTypeSliceReducer from "./slices/LeavesTypeSlice";
import departmentSliceReducer from "./slices/DepartmentSlice";
import timeslotSliceReducer from "./slices/TimeslotSlice";
// ==============================|| COMBINE REDUCER ||============================== //

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: []
};
const rootReducer = combineReducers({
  customization: customizationReducer,
  loginReducer: loginSliceReducer,
  roleReducer: roleSliceReducer,
  userReducer: userSliceReducer,
  employeeReducer: employeeSliceReducer,
  salutationReducer: salutationSliceReducer,
  permissionReducer: permissionSliceReducer,
  attendanceReducer: attendanceSliceReducer,
  dashboardReducer: dashboardSliceReducer,
  companyReducer: companySliceReducer,
  designationReducer: designationSliceReducer,
  leaveRequestReducer: leaveRequestSliceReducer,
  leaveTypeReducer: leaveTypeSliceReducer,
  departmentReducer: departmentSliceReducer,
  timeslotReducer: timeslotSliceReducer
});

export { rootPersistConfig, rootReducer };
