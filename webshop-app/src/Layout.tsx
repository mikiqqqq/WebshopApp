import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { FilterOptions, Product } from "./components/MainContainerData";
import AnnouncementBar from "./components/announcement_bar/AnnouncementBar";
import FixedSidebar from "./components/fixed_sidebar/FixedSidebar";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Support from "./components/support/Support";
import ItemService from "./services/ItemService";

const defaultFilterOptions: FilterOptions = {
  brandIds: [],
  uprLmt: 15000,
  lwrLmt: 0,
  productTypeId: 0,
  productionYear: 0,
  sortBy: "NAME",
  sortOrder: "ASC"
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [items, setItems] = useState<Product[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(defaultFilterOptions);
  const [resetFilters, setResetFilters] = useState<boolean>(false);

  useEffect(() => {
    ItemService.filterItems(filterOptions).then((response) => {
      setItems(response.data);
    }).catch(() => setError(true));
  }, [filterOptions]);

  const handleFilterOptionsChange = (newFilterOptions: FilterOptions) => {
    setFilterOptions(newFilterOptions);
  };

  const handleClearAll = () => {
    setFilterOptions(defaultFilterOptions);
    setResetFilters(true); // Trigger reset
  };

  useEffect(() => {
    if (resetFilters) {
      setResetFilters(false); // Reset the trigger after it has been handled
    }
  }, [resetFilters]);

  return (
    <div className="page">
      <AnnouncementBar />
      <Header />
      {location.pathname === '/' && (
        <FixedSidebar 
          filterOptions={filterOptions}
          onFilterOptions={handleFilterOptionsChange}
          reset={resetFilters}
        />
      )}
      {children}
      <Support />
      <Footer />
    </div>
  );
};

export default Layout;
