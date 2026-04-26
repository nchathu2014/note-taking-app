import {
  confirmable,
  createConfirmation,
  type ConfirmDialogProps,
} from "react-confirm";

const MyDialog = ({
  show,
  proceed,
  message,
}: ConfirmDialogProps<{ message: string }, boolean>) => (
  <div className={`dialog-overlay ${show ? "show" : "hide"}`}>
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-red-500 text-2xl">!</span>
          </div>
        </div>

        {/* Message */}
        <p className="text-center text-xl text-gray-700  font-medium mb-6">
          {message}
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => proceed(false)}
            className="w-full py-2 px-4 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-sm transition-colors hover:cursor-pointer"
          >
            No
          </button>
          <button
            onClick={() => proceed(true)}
            className="w-full py-2 px-4 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-sm transition-colors hover:cursor-pointer"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
);

export const confirm = createConfirmation(confirmable(MyDialog));
