"use client"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useUpdateRequestForgotPasswordMutation } from 'src/store/features/user/userApiSlice';
import * as Yup from 'yup';
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from 'next/navigation';


const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
});

const ResetPassword = ({params}) => {
   const router =useRouter()
    const [updatePassword, { isLoading: isUpdating, error: updateError }] =
useUpdateRequestForgotPasswordMutation()
const uuid=params.uuid;
  const handleSubmit =async (values, { setSubmitting }) => {
     try {
      // Handle password reset logic here (e.g., call an API to update the password)
      const response = await updatePassword({uuid, ...values});
      // Assuming the API response contains success information
        // Show error toast message (if API response contains an error message)
        if (response?.data?.code==200) {
          toast.success(response.data.message, {
            autoClose: 3000,
          });
          router.push("/login")
        } else if(response?.data?.code==400){
            toast.error(response.data.message, {
                autoClose: 3000,
              });
        }else{
            toast.error(response.data.message, {
                autoClose: 3000,
              });
        }
    } catch (error) {
      // Show error toast for unexpected errors
      toast.error("An error occurred. Please try again later.", {
        autoClose: 3000,
      });
    }
    setSubmitting(false);
  };

 


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
        <Formik
          initialValues={{ password: '', confirmPassword: '' }}
          validationSchema={ResetPasswordSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="password" className="block mb-1 font-medium">
                  New Password:
                </label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 mt-1" />
              </div>
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block mb-1 font-medium">
                  Confirm Password:
                </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 mt-1" />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none"
              >
                {isSubmitting ? 'Submitting...' : 'Reset Password'}
              </button>
            </Form>
          )}
        </Formik>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ResetPassword;
