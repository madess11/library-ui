import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SearchPage from "./SearchPage";
import React from 'react';

// On mock useNavigate pour vérifier qu'il est appelé correctement
const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("SearchPage", () => {
  beforeEach(() => {
    mockedUsedNavigate.mockReset();
  });

  it("affiche les champs de formulaire", () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/Titre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Auteur/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Sujet/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Année de publication/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Rechercher/i })).toBeInTheDocument();
  });

  it("navigue avec la bonne query lors de la soumission", () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Titre/i), { target: { value: "React" } });
    fireEvent.change(screen.getByLabelText(/Auteur/i), { target: { value: "Dan" } });
    fireEvent.change(screen.getByLabelText(/Sujet/i), { target: { value: "JavaScript" } });
    fireEvent.change(screen.getByLabelText(/Année de publication/i), { target: { value: "2020" } });

    fireEvent.click(screen.getByRole("button", { name: /Rechercher/i }));

    expect(mockedUsedNavigate).toHaveBeenCalledWith(
      "/results?q=title%3AReact%20author%3ADan%20subject%3AJavaScript%20first_publish_year%3A2020"
    );
  });
});
