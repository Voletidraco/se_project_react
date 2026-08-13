import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import { apiKey } from "../../utils/constants.js";
import Footer from "../Footer/Footer.jsx";
import { coordinates as fallbackCoordinates } from "../../utils/constants.js";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import Profile from "../Profile/Profile.jsx";
import {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
  updateUserProfile,
} from "../../utils/api.js";
import { signup, signin, checkToken } from "../../utils/auth.js";

function App() {
  const navigate = useNavigate();

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [weatherData, setWeatherData] = useState({ type: "" });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);

  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [authError, setAuthError] = useState("");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleRegisterClick = () => {
    setAuthError("");
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setAuthError("");
    setActiveModal("login");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const closeActiveModal = () => {
    setActiveModal("");
    setAuthError("");
  };

  const onAddItem = (inputValues) => {
    const token = localStorage.getItem("jwt");
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weather,
    };

    addItem(newCardData, token)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleDeleteItem = (itemId) => {
    const token = localStorage.getItem("jwt");
    deleteItem(itemId, token)
      .then(() => {
        setClothingItems(clothingItems.filter((item) => item._id !== itemId));
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    !isLiked
      ? addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item)),
            );
          })
          .catch((err) => console.log(err))
      : removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item)),
            );
          })
          .catch((err) => console.log(err));
  };

  const handleRegistration = ({ name, avatar, email, password }) => {
    setAuthError("");
    signup({ name, avatar, email, password })
      .then(() => handleLogin({ email, password }))
      .catch((err) => {
        console.error(err);
        setAuthError("This email may already be in use. Please try again.");
      });
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      setAuthError("Email and password are required.");
      return;
    }

    setAuthError("");
    signin({ email, password })
      .then((res) => {
        if (!res || !res.token) {
          return Promise.reject(new Error("No token returned"));
        }
        localStorage.setItem("jwt", res.token);
        return checkToken(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        closeActiveModal();
        navigate("/profile");
      })
      .catch((err) => {
        console.error(err);
        setAuthError("Incorrect email or password.");
      });
  };

  const handleUpdateUser = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    updateUserProfile({ name, avatar }, token)
      .then((user) => {
        setCurrentUser(user);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      getWeather(fallbackCoordinates, apiKey)
        .then((data) => {
          const filteredData = filterWeatherData(data);
          setWeatherData(filteredData);
        })
        .catch(console.error);

      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        getWeather(coords, apiKey)
          .then((data) => {
            const filteredData = filterWeatherData(data);
            setWeatherData(filteredData);
          })
          .catch(console.error);
      },
      () => {
        getWeather(fallbackCoordinates, apiKey)
          .then((data) => {
            const filteredData = filterWeatherData(data);
            setWeatherData(filteredData);
          })
          .catch(console.error);
      },
    );

    getItems()
      .then((data) => {
        setClothingItems(data.reverse());
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      setIsCheckingAuth(false);
      return;
    }

    checkToken(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem("jwt");
      })
      .finally(() => setIsCheckingAuth(false));
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="app">
          <div className="app__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              onRegisterClick={handleRegisterClick}
              onLoginClick={handleLoginClick}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    isLoggedIn={isLoggedIn}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    isCheckingAuth={isCheckingAuth}
                  >
                    <Profile
                      onAddItemClick={handleAddClick}
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      onCardLike={handleCardLike}
                      onEditProfileClick={handleEditProfileClick}
                      onSignOut={handleSignOut}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            closeActiveModal={closeActiveModal}
            onAddItem={onAddItem}
          />
          <ItemModal
            isOpen={activeModal === "preview"}
            selectedCard={selectedCard}
            closeActiveModal={closeActiveModal}
            onDeleteItem={handleDeleteItem}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            closeActiveModal={closeActiveModal}
            onRegister={handleRegistration}
            onLoginClick={handleLoginClick}
            authError={authError}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            closeActiveModal={closeActiveModal}
            onLogin={handleLogin}
            onRegisterClick={handleRegisterClick}
            authError={authError}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            closeActiveModal={closeActiveModal}
            onUpdateUser={handleUpdateUser}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
