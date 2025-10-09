import { toast } from 'react-toastify';

// Custom success toast with beautiful styling
export const showSuccessToast = (message, productName = '') => {
  const toastContent = (
    <div className="flex flex-col">
      <div className="font-semibold text-gray-900 text-sm">
        🛒 Added to Cart!
      </div>
      <div className="text-gray-600 text-xs mt-1">
        {productName ? `${productName} added successfully` : message}
      </div>
    </div>
  );

  toast.success(toastContent, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: "custom-toast",
    bodyClassName: "custom-toast-body",
    progressClassName: "custom-toast-progress",
  });
};

// Custom error toast
export const showErrorToast = (message) => {
  const toastContent = (
    <div className="flex flex-col">
      <div className="font-semibold text-gray-900 text-sm">
        ❌ Error!
      </div>
      <div className="text-gray-600 text-xs mt-1">
        {message}
      </div>
    </div>
  );

  toast.error(toastContent, {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: "custom-toast",
    bodyClassName: "custom-toast-body",
    progressClassName: "custom-toast-progress",
  });
};

// Custom info toast
export const showInfoToast = (message) => {
  const toastContent = (
    <div className="flex flex-col">
      <div className="font-semibold text-gray-900 text-sm">
        ℹ️ Info
      </div>
      <div className="text-gray-600 text-xs mt-1">
        {message}
      </div>
    </div>
  );

  toast.info(toastContent, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: "custom-toast",
    bodyClassName: "custom-toast-body",
    progressClassName: "custom-toast-progress",
  });
};

