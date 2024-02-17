import { BrowserRouter, Route, Routes } from "react-router-dom";

import WelcomePage from "./container/WelcomePage";
import SignupPage from "./container/SignupPage";
import SigninPage from "./container/SigninPage";
import SignupConfirmPage from "./container/SignupConfirmPage";
import RecoveryPage from "./container/RecoveryPage";
import RecoveryConfirmPage from "./container/RecoveryConfirmPage";
import BalancePage from "./container/BalancePage";
import NotificationsPage from "./container/NotificationsPage";
import SettingsPage from "./container/SettingsPage";
import RecivePage from "./container/RecivePage";
import SendPage from "./container/SendPage";
import TransactionPage from "./container/TransactionPage";

//

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<WelcomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signup-confirm" element={<SignupConfirmPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/recovery" element={<RecoveryPage />} />
        <Route path="/recovery-confirm" element={<RecoveryConfirmPage />} />
        <Route path="/recovery" element={<RecoveryPage />} />
        <Route path="/balance" element={<BalancePage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/recive" element={<RecivePage />} />
        <Route path="/send" element={<SendPage />} />
        <Route path="/transaction/:id" element={<TransactionPage />} />
      </Routes>
    </BrowserRouter>)
}


// return (
//   <AuthContext.Provider value={authContextData}>
//     <BrowserRouter>
//       <Routes>
//         <Route
//           index
//           element={
//             <AuthRoute>
//               <WellcomePage />
//             </AuthRoute>
//           }
//         />
//         <Route
//           path="/signup"
//           element={
//             <AuthRoute>
//               <SignupPage />
//             </AuthRoute>
//           }
//         />
//         <Route
//           path="/signup-confirm"
//           element={
//             <PrivateRoute>
//               <SignupConfirmPage />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/signin"
//           element={
//             <AuthRoute>
//               <SigninPage />
//             </AuthRoute>
//           }
//         />
//         <Route
//           path="/recovery"
//           element={
//             <AuthRoute>
//               <RecoveryPage />
//             </AuthRoute>
//           }
//         />
//         <Route
//           path="/recovery-confirm"
//           element={
//             <AuthRoute>
//               <RecoveryConfirmPage />
//             </AuthRoute>
//           }
//         />
//         <Route
//           path="/balance"
//           element={
//             <PrivateRoute>
//               <BalancePage />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/notifications"
//           element={
//             <PrivateRoute>
//               <NotificationsPage />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/settings"
//           element={
//             <PrivateRoute>
//               <SettingsPage />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/recive"
//           element={
//             <PrivateRoute>
//               <RecivePage />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/send"
//           element={
//             <PrivateRoute>
//               <SendPage />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/transaction/:transactionId"
//           element={
//             <PrivateRoute>
//               <TransactionPage />
//             </PrivateRoute>
//           }
//         />
//         <Route path="*" Component={Error} />
//       </Routes>
//     </BrowserRouter>
//   </AuthContext.Provider>
// );
