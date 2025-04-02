import React, { useEffect, useState } from "react";
import { AddCapitalModal } from "../admin/CapitalAddModal";
import adminAxiosInstance from "@/config/AdminAxiosInstence";

const CapitalCard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [capital, setCapital] = useState(0);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Fetch capital from the API
  const fetchCapital = async () => {
    try {
      const response = await adminAxiosInstance.get("/get-capital");
      setCapital(response.data.capital.availableBalance);
    } catch (error) {
      console.error("Error fetching capital:", error);
    }
  };

  useEffect(() => {
    fetchCapital(); 
  }, []);

  const handleSubmit = (amount: number) => {
    const addCapital = async () => {
      try {
        await adminAxiosInstance.post("/add-capital", {
          amount,
        });
        fetchCapital(); 
      } catch (error) {
        console.error("Error adding capital:", error);
      }
    };
    addCapital();
    closeModal(); 
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-6 w-auto mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-teal-600 font-semibold text-lg">
          Capital Overview
        </h2>
        <button
          className="bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition duration-300"
          onClick={openModal}
        >
          Add Capital
        </button>
      </div>
      <div className="text-center py-6">
        <p className="text-teal-600 text-2xl font-bold">
          Available Capital: {capital}
        </p>
      </div>

      {isModalOpen && (
        <AddCapitalModal closeModal={closeModal} handleSubmit={handleSubmit} />
      )}
    </div>
  );
};

export default CapitalCard;
