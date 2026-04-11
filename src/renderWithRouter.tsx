import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import ContextsContainer from "./@context/contextsContainer/ContextsContainer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const renderWithRouter = (ui: React.ReactElement, route = "/") => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <QueryClientProvider client={queryClient}>
        <ContextsContainer>{ui}</ContextsContainer>
      </QueryClientProvider>
    </MemoryRouter>,
  );
};
