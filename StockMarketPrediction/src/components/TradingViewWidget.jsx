import { useEffect } from 'react';

const TradingViewWidget = ({ symbol }) => {
  useEffect(() => {
    // Function to load the TradingView script
    const loadTradingViewScript = () => {
      if (!window.TradingView) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://s3.tradingview.com/tv.js';
        script.async = true;
        script.onload = () => initializeWidget();
        document.body.appendChild(script);
      } else {
        initializeWidget();
      }
    };

    // Function to initialize the TradingView widget
    const initializeWidget = () => {
      // Clear previous widget if exists
      const widgetContainer = document.getElementById('tradingview_advanced_chart');
      widgetContainer.innerHTML = '';

      new window.TradingView.widget({
        width: "100%",
        height: 500,
        symbol: symbol ,
        interval: "D",
        timezone: "Etc/UTC",
        theme: "light",
        style: "1",
        locale: "en",
        toolbar_bg: "#f1f3f6",
        enable_publishing: false,
        allow_symbol_change: true,
        save_image: false,
        container_id: "tradingview_advanced_chart",
        // Additional configurations can be added here
      });
    };

    loadTradingViewScript();
  }, [symbol]);

  return (
    <div className="tradingview-widget-container">
      <div id="tradingview_advanced_chart"></div>
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" target="_blank" rel="noopener"></a>
      </div>
    </div>
  );
};

export default TradingViewWidget;
