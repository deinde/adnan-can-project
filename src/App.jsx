import React, { useState, useEffect } from 'react'
import SellerDashboard from './components/SellerDashboard'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const App = () => {
    const [view, setView] = useState('grid')
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [filter, setFilter] = useState('All')
    const [mode, setMode] = useState('buyer') // buyer or seller
    const [cart, setCart] = useState([])
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [isCheckout, setIsCheckout] = useState(false)
    const [showAnalytics, setShowAnalytics] = useState(false)
    const [products, setProducts] = useState([])
    const [analytics, setAnalytics] = useState(null)

    // Interactive Filters State
    const [minThc, setMinThc] = useState(0)
    const [minVol, setMinVol] = useState(0)
    const [selectedState, setSelectedState] = useState('All')

    useEffect(() => {
        fetch(`${API_URL}/api/products`)
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error("Error fetching products:", err))

        fetch(`${API_URL}/api/analytics`)
            .then(res => res.json())
            .then(data => setAnalytics(data))
            .catch(err => console.error("Error fetching analytics:", err))
    }, [])

    const addToCart = (product) => {
        setCart(prev => [...prev, { ...product, cartId: Date.now() }])
        setIsCartOpen(true)
    }

    const removeFromCart = (cartId) => {
        setCart(prev => prev.filter(item => item.cartId !== cartId))
    }

    const handleCheckout = () => {
        fetch(`${API_URL}/api/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                items: cart,
                total: cart.reduce((sum, item) => sum + parseInt(item.price.replace(/[^0-9]/g, '')), 0)
            })
        })
            .then(res => res.json())
            .then(data => {
                alert(`Order Submitted! ID: ${data.orderId}`);
                setCart([]);
                setIsCheckout(false);
            })
            .catch(err => console.error("Error submitting order:", err))
    }

    const filteredProducts = products.filter(p => {
        const matchesCategory = filter === 'All' || p.type === filter;
        const matchesThc = parseFloat(p.thc) >= minThc;
        const matchesVol = parseFloat(p.volume) >= minVol;
        const matchesState = selectedState === 'All' || p.location === selectedState;
        return matchesCategory && matchesThc && matchesVol && matchesState;
    });

    const categories = ["All", "Live Resin", "Live Rosin", "Distillate", "Isolate", "Sauce", "Diamonds"]
    const states = ["All", "California", "Oregon", "Colorado", "Washington"]

    return (
        <div className="app-container">
            {/* Sidebar */}
            {!showAnalytics && mode === 'buyer' && (
                <aside className="sidebar">
                    <div className="sidebar-section">
                        <h3>Product Types</h3>
                        <nav className="sidebar-nav">
                            {categories.map(cat => (
                                <div
                                    key={cat}
                                    className={`nav-item ${filter === cat ? 'active' : ''}`}
                                    onClick={() => setFilter(cat)}
                                >
                                    {cat}
                                </div>
                            ))}
                        </nav>
                    </div>

                    <div className="sidebar-section">
                        <h3>Interactive Filters</h3>
                        <div className="filter-group">
                            <label>Min THC: {minThc}%</label>
                            <input type="range" min="0" max="100" value={minThc} onChange={(e) => setMinThc(e.target.value)} />
                        </div>
                        <div className="filter-group">
                            <label>Min Volume: {minVol} units</label>
                            <input type="range" min="0" max="100" value={minVol} onChange={(e) => setMinVol(e.target.value)} />
                        </div>
                        <div className="filter-group">
                            <label>State</label>
                            <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} className="filter-select">
                                {states.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>
                </aside>
            )}

            {/* Main Content */}
            <main className="main-content">
                <nav className="navbar">
                    <div className="logo">
                        Z.FLOW <span style={{ fontWeight: 400, opacity: 0.6 }}>MARKET</span>
                    </div>
                    <div className="navbar-nav">
                        <span className={`top-nav-item ${mode === 'buyer' && !showAnalytics ? 'active-nav' : ''}`} onClick={() => { setMode('buyer'); setShowAnalytics(false); }}>Procurement</span>
                        <span className={`top-nav-item ${mode === 'seller' && !showAnalytics ? 'active-nav' : ''}`} onClick={() => { setMode('seller'); setShowAnalytics(false); }}>Inventory</span>
                        <span className="top-nav-item">Messages</span>
                        <span className={`top-nav-item ${showAnalytics ? 'active-nav' : ''}`} onClick={() => setShowAnalytics(true)}>Analytics</span>
                    </div>
                    <div className="navbar-actions" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                        <div
                            className="top-nav-item"
                            onClick={() => setIsCartOpen(true)}
                            style={{ position: 'relative', color: cart.length > 0 ? 'var(--accent-primary)' : 'inherit' }}
                        >
                            CART [{cart.length}]
                        </div>
                        <div className="top-nav-item" style={{ fontSize: '0.8rem', opacity: 0.5 }}>Account</div>
                    </div>
                </nav>

                <div className="page-container">
                    {showAnalytics ? (
                        <div className="analytics-view">
                            <header className="marketplace-header">
                                <div>
                                    <h1>Market Analytics & Trends</h1>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Deep-dive into concentrate market data and wholesale trends.</p>
                                </div>
                                <button className="btn btn-secondary" onClick={() => window.print()}>Export PDF Report</button>
                            </header>

                            <div className="checkout-grid">
                                <div className="main-analytics">
                                    <div className="checkout-section">
                                        <h3 style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>Pricing Trends - 90 Days</h3>
                                        <div className="product-table-container">
                                            <table className="product-table">
                                                <thead>
                                                    <tr>
                                                        <th>Category</th>
                                                        <th>Oct</th>
                                                        <th>Nov</th>
                                                        <th>Dec (Current)</th>
                                                        <th>% Change</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {analytics && analytics.pricingTrends ? analytics.pricingTrends.map((trend, idx) => (
                                                        <tr key={idx}>
                                                            <td>{trend.category}</td>
                                                            <td>${trend.oct}</td>
                                                            <td>${trend.nov}</td>
                                                            <td style={{ color: 'var(--accent-primary)', fontWeight: '700' }}>${trend.dec}</td>
                                                            <td style={{ color: trend.change.startsWith('+') ? 'var(--accent-primary)' : '#ff4d4d' }}>{trend.change}</td>
                                                        </tr>
                                                    )) : (
                                                        <tr><td colSpan="5">Loading data...</td></tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <aside className="market-insights-panel">
                                    <div className="insight-card">
                                        <span className="insight-title">Supply Alerts</span>
                                        <p style={{ fontSize: '0.85rem' }}>⚠️ **Live Rosin** inventory is dropping in CA North. Prices expected to rise.</p>
                                    </div>
                                    <div className="insight-card" style={{ background: 'var(--bg-tertiary)' }}>
                                        <span className="insight-title">Platform Stats</span>
                                        <div style={{ marginTop: '0.5rem' }}>Listing Vol: {analytics ? analytics.platformStats.listingVol : '...'}</div>
                                        <div>Verified Lbs: {analytics ? analytics.platformStats.verifiedLbs : '...'}</div>
                                    </div>
                                </aside>
                            </div>
                        </div>
                    ) : mode === 'buyer' ? (
                        <>
                            <header className="marketplace-header">
                                <div>
                                    <h1>{filter} Concentrates</h1>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Procuring bulk stock.</p>
                                </div>
                                <div className="view-toggle">
                                    <button className={`toggle-btn ${view === 'grid' ? 'active' : ''}`} onClick={() => setView('grid')}>Grid</button>
                                    <button className={`toggle-btn ${view === 'table' ? 'active' : ''}`} onClick={() => setView('table')}>Table</button>
                                </div>
                            </header>

                            <div className="marketplace-layout">
                                <div className="main-marketplace-view">
                                    {view === 'grid' ? (
                                        <div className="product-grid">
                                            {filteredProducts.map(p => (
                                                <div key={p.id} className="product-card" onClick={() => setSelectedProduct(p)}>
                                                    <div className="card-header">
                                                        <span className="supplier-name">{p.supplier}</span>
                                                        <span className="coa-badge">{p.coa}</span>
                                                    </div>
                                                    <h2 className="product-title">{p.product}</h2>
                                                    <div className="price-tag">{p.price}</div>
                                                    <button className="btn btn-primary" onClick={(e) => { e.stopPropagation(); addToCart(p); }}>Add to Cart</button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="product-table-container">
                                            <table className="product-table">
                                                <thead>
                                                    <tr>
                                                        <th>Supplier</th>
                                                        <th>Product</th>
                                                        <th>Price</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredProducts.map(p => (
                                                        <tr key={p.id} onClick={() => setSelectedProduct(p)}>
                                                            <td>{p.supplier}</td>
                                                            <td>{p.product}</td>
                                                            <td style={{ color: 'var(--accent-primary)' }}>{p.price}</td>
                                                            <td><button className="btn btn-primary" onClick={(e) => { e.stopPropagation(); addToCart(p); }}>Add</button></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>

                                <aside className="market-insights-panel">
                                    <div className="insight-card">
                                        <span className="insight-title">Market Indicators</span>
                                        <div className="trend-item">Live Resin: $435/lb <span className="trend-up">↑</span></div>
                                        <div className="trend-item">Distillate: $295/kg <span className="trend-down">↓</span></div>
                                    </div>
                                </aside>
                            </div>
                        </>
                    ) : (
                        <SellerDashboard />
                    )}
                </div>
            </main>

            {/* Product Detail Modal */}
            {selectedProduct && (
                <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setSelectedProduct(null)}>×</button>
                        <div className="detail-section">
                            <div className="detail-supplier">{selectedProduct.supplier}</div>
                            <h2>{selectedProduct.product}</h2>
                            <div className="detail-info-grid">
                                <div className="stat-item"><span className="stat-label">THC %</span><span className="stat-value">{selectedProduct.thc}</span></div>
                                <div className="stat-item"><span className="stat-label">Location</span><span className="stat-value">{selectedProduct.location}</span></div>
                            </div>
                            <button className="btn btn-primary" style={{ width: '100%', marginTop: '2rem' }} onClick={() => addToCart(selectedProduct)}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Cart Drawer */}
            {isCartOpen && (
                <>
                    <div className="modal-overlay" onClick={() => setIsCartOpen(false)} style={{ zIndex: 1050 }} />
                    <div className="cart-drawer">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--accent-primary)' }}>Your Cart</h2>
                            <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '2rem', cursor: 'pointer' }}>×</button>
                        </div>

                        <div style={{ flex: 1, overflowY: 'auto' }}>
                            {cart.length === 0 ? (
                                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: '2rem' }}>Your cart is empty.</p>
                            ) : (
                                cart.map(item => (
                                    <div key={item.cartId} className="cart-item">
                                        <span>{item.product}</span>
                                        <button className="remove-btn" onClick={() => removeFromCart(item.cartId)}>Remove</button>
                                    </div>
                                ))
                            )}
                        </div>

                        <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
                                <span style={{ fontWeight: '700', fontSize: '1.25rem' }}>
                                    ${cart.reduce((sum, item) => sum + (parseInt(item.price.replace(/[^0-9]/g, '')) || 0), 0).toLocaleString()}
                                </span>
                            </div>
                            <button
                                className="btn btn-primary"
                                style={{ width: '100%', padding: '1.25rem' }}
                                onClick={() => { setIsCartOpen(false); setIsCheckout(true); }}
                                disabled={cart.length === 0}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* Checkout Overlay */}
            {isCheckout && (
                <div className="modal-overlay">
                    <div className="modal-content" style={{ display: 'block' }}>
                        <button className="close-btn" onClick={() => setIsCheckout(false)}>×</button>
                        <h1>Finalize Order</h1>
                        <p>Submitting procurement for {cart.length} items.</p>
                        <button className="btn btn-primary" style={{ marginTop: '2rem', width: '100%' }} onClick={handleCheckout}>Submit Purchase Order</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
