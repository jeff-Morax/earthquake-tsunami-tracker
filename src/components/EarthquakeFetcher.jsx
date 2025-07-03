// src/components/EarthquakeFetcher.jsx
import { useEffect, useState, useCallback } from 'react'
import './EarthquakeFetcher.css'

function EarthquakeFetcher() {
  const [tsunamiData, setTsunamiData] = useState(null)
  const [earthquakeData, setEarthquakeData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(null)
  const API_KEY = 'CWA-504B3E5D-FDD1-4AC0-96A2-11A5DCA902AF'

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      console.log('開始獲取數據...', new Date().toLocaleString())
      
      const [tsunamiResponse, earthquakeResponse] = await Promise.all([
        fetch(`https://opendata.cwa.gov.tw/api/v1/rest/datastore/E-A0014-001?Authorization=${API_KEY}`),
        fetch(`https://opendata.cwa.gov.tw/api/v1/rest/datastore/E-A0016-001?Authorization=${API_KEY}`)
      ]);

      if (!tsunamiResponse.ok || !earthquakeResponse.ok) {
        throw new Error('API 請求失敗')
      }

      const [tsunamiJson, earthquakeJson] = await Promise.all([
        tsunamiResponse.json(),
        earthquakeResponse.json()
      ]);

      console.log('數據獲取成功', new Date().toLocaleString())
      setTsunamiData(tsunamiJson)
      setEarthquakeData(earthquakeJson)
      setLastUpdate(new Date())
    } catch (err) {
      console.error('完整錯誤信息:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    console.log('設置定時器...', new Date().toLocaleString())
    fetchData()

    const intervalId = setInterval(() => {
      console.log('定時器觸發...', new Date().toLocaleString())
      fetchData()
    }, 30 * 1000)

    return () => {
      console.log('清理定時器...', new Date().toLocaleString())
      clearInterval(intervalId)
    }
  }, [fetchData])

  if (loading && !tsunamiData && !earthquakeData) return <div className="loading">載入中...</div>
  if (error) return <div className="error">錯誤: {error}</div>
  if (!tsunamiData && !earthquakeData) return <div className="no-data">無資料</div>

  return (
    <div className="dashboard">
      <div className="header">
        <button className="update-button" onClick={fetchData}>
          立即更新
        </button>
        {lastUpdate && (
          <span className="last-update">
            最後更新時間: {lastUpdate.toLocaleString('zh-TW')}
          </span>
        )}
      </div>

      <div className="grid-container">
        {/* 海嘯資訊 */}
        <div className="card">
          <h2>🌊 最新海嘯資訊</h2>
          {tsunamiData?.records?.Tsunami?.[0] ? (
            <div className="card-content">
              <h3>{tsunamiData.records.Tsunami[0].ReportType} - {tsunamiData.records.Tsunami[0].ReportNo}</h3>
              <p className={`status ${tsunamiData.records.Tsunami[0].ReportColor === '黃色' ? 'warning' : 'safe'}`}>
                狀態: {tsunamiData.records.Tsunami[0].ReportColor}
              </p>
              <p>{tsunamiData.records.Tsunami[0].ReportContent}</p>
              {tsunamiData.records.Tsunami[0].EarthquakeInfo && (
                <div className="details">
                  <h4>相關地震資訊:</h4>
                  <p>時間: {tsunamiData.records.Tsunami[0].EarthquakeInfo.OriginTime}</p>
                  <p>位置: {tsunamiData.records.Tsunami[0].EarthquakeInfo.Epicenter.Location}</p>
                  <p>規模: {tsunamiData.records.Tsunami[0].EarthquakeInfo.EarthquakeMagnitude.MagnitudeValue}</p>
                  <p>深度: {tsunamiData.records.Tsunami[0].EarthquakeInfo.FocalDepth} 公里</p>
                </div>
              )}
            </div>
          ) : (
            <div>目前無海嘯資訊</div>
          )}
        </div>

        {/* 地震資訊 */}
        <div className="card">
          <h2>🌐 最新地震資訊</h2>
          {earthquakeData?.records?.Earthquake?.[0] ? (
            <div className="card-content">
              <h3>{earthquakeData.records.Earthquake[0].ReportType}</h3>
              <p className={`status ${earthquakeData.records.Earthquake[0].ReportColor === '黃色' ? 'warning' : 'safe'}`}>
                狀態: {earthquakeData.records.Earthquake[0].ReportColor}
              </p>
              <p>{earthquakeData.records.Earthquake[0].ReportContent}</p>
              {earthquakeData.records.Earthquake[0].EarthquakeInfo && (
                <div className="details">
                  <h4>詳細資訊:</h4>
                  <p>時間: {earthquakeData.records.Earthquake[0].EarthquakeInfo.OriginTime}</p>
                  <p>位置: {earthquakeData.records.Earthquake[0].EarthquakeInfo.Epicenter.Location}</p>
                  <p>規模: {earthquakeData.records.Earthquake[0].EarthquakeInfo.EarthquakeMagnitude.MagnitudeValue} {earthquakeData.records.Earthquake[0].EarthquakeInfo.EarthquakeMagnitude.MagnitudeType}</p>
                  <p>深度: {earthquakeData.records.Earthquake[0].EarthquakeInfo.FocalDepth} 公里</p>
                  <p>來源: {earthquakeData.records.Earthquake[0].EarthquakeInfo.Source}</p>
                </div>
              )}
              <p className="remark">
                {earthquakeData.records.Earthquake[0].ReportRemark}
              </p>
            </div>
          ) : (
            <div>目前無地震資訊</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EarthquakeFetcher
