import React, { useState } from "react";

interface AddCapitalModalProps {
  closeModal: () => void;
  handleSubmit: (capitalAmount: number) => void; // Accept handleSubmit as a prop
}

export const AddCapitalModal: React.FC<AddCapitalModalProps> = ({
  closeModal,
  handleSubmit,
}) => {
  const [capitalAmount, setCapitalAmount] = useState("");

  // Handle the submit button click
  const onSubmit = () => {
    if (capitalAmount) {
      const amount = parseFloat(capitalAmount); // Convert to number
      handleSubmit(amount); // Pass the capital amount to the parent component
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-96 p-6">
        <h3 className="text-teal-600 text-lg font-semibold mb-4">
          Add Capital
        </h3>
        <div className="mb-4">
          <label
            htmlFor="capitalAmount"
            className="block text-sm font-medium text-gray-700"
          >
            Capital Amount
          </label>
          <input
            id="capitalAmount"
            type="number"
            value={capitalAmount}
            onChange={(e) => setCapitalAmount(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-teal-300 rounded-lg text-teal-600 focus:ring-teal-500 focus:border-teal-500"
            placeholder="Enter amount"
          />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition duration-300"
            onClick={onSubmit} // Call onSubmit when Add button is clicked
          >
            Add
          </button>
          <button
            className="ml-4 text-teal-600 hover:text-teal-700"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
