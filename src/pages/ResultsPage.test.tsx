import React from 'react';
import { render, screen } from "@testing-library/react";
import ResultsPage from "./ResultsPage"; // adapte le chemin selon ton projet

describe("ResultsPage", () => {
  it("affiche le titre de la page avec la query", () => {
    // On simule un paramètre de recherche dans l'URL
    const mockSearchParams = new URLSearchParams("q=harry+potter");
    // Mock useSearchParams pour retourner ce paramètre
    jest.spyOn(require("react-router-dom"), "useSearchParams").mockReturnValue([mockSearchParams]);

    render(<ResultsPage />);
    
    expect(screen.getByText(/Résultats pour “harry potter”/i)).toBeInTheDocument();
  });
});
