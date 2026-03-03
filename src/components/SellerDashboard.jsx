import React, { useState, useEffect } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const SellerDashboard = () => {
    const [inventory, setInventory] = useState([])
    const [isAdding, setIsAdding] = useState(false)
    const [formData, setFormData] = useState({
        product: '',
        supplier: 'Your Cultivation Co.',
        type: 'Live Resin',
        volume: '',
        price: '',
        thc: '80%',
        location: 'California'
    })

    const fetchInventory = () => {
        fetch(`${API_URL}/api/products`)
            .then(res => res.json())
            .then(data => setInventory(data))
            .catch(err => console.error("Error fetching inventory:", err))
    }

    useEffect(() => {
        fetchInventory()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`${API_URL}/api/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(() => {
                setIsAdding(false)
                fetchInventory()
            })
    }

    return (
        <div className="page-container">
            <header className="marketplace-header">
                <div>
                    <h1>Seller Dashboard</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Managing inventory and marketplace performance.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <button className="btn btn-primary" onClick={() => setIsAdding(true)}>+ Add New Batch</button>
                    <div className="coa-badge">LICENSE: C11-0000123-LIC</div>
                </div>
            </header>

            {/* Add Inventory Modal */}
            {isAdding && (
                <div className="modal-overlay">
                    <div className="modal-content compact">
                        <button className="close-btn" onClick={() => setIsAdding(false)}>×</button>
                        <h2>List New Inventory</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Product Name</label>
                                <input
                                    placeholder="e.g. Live Resin - OG Kush"
                                    required
                                    onChange={e => setFormData({ ...formData, product: e.target.value })}
                                />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div className="form-group">
                                    <label>Type</label>
                                    <select onChange={e => setFormData({ ...formData, type: e.target.value })}>
                                        <option>Live Resin</option>
                                        <option>Live Rosin</option>
                                        <option>Distillate</option>
                                        <option>Isolate</option>
                                        <option>Sauce</option>
                                        <option>Diamonds</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>THC %</label>
                                    <input placeholder="85%" onChange={e => setFormData({ ...formData, thc: e.target.value })} />
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div className="form-group">
                                    <label>Volume (lbs/kg)</label>
                                    <input placeholder="20 lbs" required onChange={e => setFormData({ ...formData, volume: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Price ($/unit)</label>
                                    <input placeholder="$400/lb" required onChange={e => setFormData({ ...formData, price: e.target.value })} />
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div className="form-group">
                                    <label>Extraction Method</label>
                                    <input placeholder="e.g. BHO, Cryo" onChange={e => setFormData({ ...formData, extraction: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Terpenes / Purity</label>
                                    <input placeholder="e.g. 99%, Limonene" onChange={e => setFormData({ ...formData, terpenes: e.target.value })} />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '2rem' }}>Publish to Marketplace</button>
                        </form>
                    </div>
                </div>
            )}

            <div className="marketplace-layout">
                <div className="main-marketplace-view">
                    <h3 className="insight-title">Inventory Overview</h3>
                    <div className="product-table-container">
                        <table className="product-table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Type</th>
                                    <th>Volume</th>
                                    <th>Price</th>
                                    <th>THC</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inventory.map(item => (
                                    <tr key={item.id}>
                                        <td style={{ fontWeight: '700', color: 'var(--accent-primary)' }}>{item.product}</td>
                                        <td>{item.type}</td>
                                        <td>{item.volume}</td>
                                        <td>{item.price}</td>
                                        <td style={{ fontWeight: '700' }}>{item.thc}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <aside className="market-insights-panel">
                    <div className="insight-card">
                        <span className="insight-title">Analytics Snapshot</span>
                        <div className="trend-item">
                            <span>Conversion Rate</span>
                            <span className="trend-up">2.8% (+0.5%)</span>
                        </div>
                        <div className="trend-item" style={{ marginTop: '1rem' }}>
                            <span>Avg. Response Time</span>
                            <span style={{ fontWeight: '600' }}>14 mins</span>
                        </div>
                    </div>

                    <div className="insight-card" style={{ borderLeft: '4px solid var(--accent-secondary)' }}>
                        <span className="insight-title">Market Compare</span>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                            Your price for **Live Resin** is **$15/lb lower** than the local average.
                            Consider raising price to match trend.
                        </p>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default SellerDashboard
