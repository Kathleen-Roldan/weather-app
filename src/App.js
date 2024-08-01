import React, { useState } from 'react';

const api = {
    key: "6b369bc21d42ab7c3483ee26fee3039f",
    base: "https://api.openweathermap.org/data/2.5/",
};

const App = () => {
    const [search, setSearch] = useState("");
    const [weather, setWeather] = useState({});
    const [loading, setLoading] = useState(false);

    const searchPressed = () => {
        if (!search) {
            alert('Please enter a city or town');
            return;
        }
        setLoading(true);
        fetch(`${api.base}weather?q=${search}&units=metric&appid=${api.key}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(result => {
                setWeather(result);
                setLoading(false);
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
                setLoading(false);
            });
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Weather App</h1>

            <div style={styles.searchContainer}>
                <input
                    type="text"
                    style={styles.input}
                    placeholder="Enter city/town..."
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                />
                <button onClick={searchPressed} style={styles.button}>Search</button>
            </div>

            <div style={styles.resultContainer}>
                {loading ? (
                    <div style={styles.loadingContainer}>
                        <div style={styles.spinner}></div>
                        <p style={styles.loadingText}>Loading...</p>
                    </div>
                ) : (
                    <div style={styles.weatherContainer}>
                        {weather.name && <p style={styles.weatherText}>{weather.name}</p>}
                        {weather.main && <p style={styles.weatherText}>{weather.main.temp} °C</p>}
                        {weather.weather && (
                            <div>
                                <p style={styles.weatherMain}>{weather.weather[0].main}</p>
                                <p style={styles.weatherDescription}>{weather.weather[0].description}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#CEC4CB',
        height: '100vh',
        boxSizing: 'border-box',
    },
    header: {
        fontSize: '32px',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: '#333',
    },
    searchContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    },
    input: {
        height: '40px',
        flex: '1',
        padding: '0 10px',
        border: 'none',
        outline: 'none',
    },
    button: {
        padding: '10px 20px',
        border: 'none',
        backgroundColor: '#C996B8',
        color: '#fff',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    resultContainer: {
        display: 'flex',
        flex: '1',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    weatherContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: '100px',
        width: '200px',
        height: '200px',
        border: '1px solid #ccc',
        padding: '20px',
        textAlign: 'center',
    },
    weatherText: {
        fontSize: '24px',
        marginBottom: '10px',
        color: '#333',
    },
    weatherMain: {
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '5px',
        color: '#666',
    },
    weatherDescription: {
        fontSize: '16px',
        color: '#666',
    },
    loadingContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: '10px',
        fontSize: '16px',
        color: '#666',
    },
    spinner: {
        width: '40px',
        height: '40px',
        border: '4px solid rgba(201, 150, 184, 0.3)',
        borderTopColor: '#C996B8',
        borderRadius: '50%',
        animation: 'spin 1s infinite linear',
    },
    footer: {
        marginTop: '50px',
        marginBottom: '20px',
    },
    footerText: {
        fontSize: '12px',
        color: '#666',
    },
};

export default App;
