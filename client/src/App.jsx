import "./App.css";
import StartPage from "./pages/StartPage";
import InvestorPage from "./pages/InvestorPage";
import CompanyPage from "./pages/CompanyPage";
import DeveloperPage from "./pages/DeveloperPage";
import MaintainerPage from "./pages/MaintainerPage";
import Layout from "./Layout";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { Route, Routes } from "react-router-dom";

import {
  mainnet,
  polygon,
  base,
  optimism,
  arbitrum,
  zora,
  sepolia,
  hardhat,
} from "wagmi/chains";

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, base, zora, hardhat, sepolia],
  [publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: "Chamber",
  projectId: "sfs",
  chains,
});
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});


function App() {

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme({
          accentColor: "rgba(39, 39, 39, 0.78)",
          accentColorForeground: "#DCD7C9",
          // borderRadius: "small",
        })}
      >
        {/* <StartPage/>
          <CompanyPage/> 
          <InvestorPage/> */}
        <Layout>
          <Routes>
            <Route exact path="/" element={<StartPage />} />
            <Route exact path="/CompanyPage" element={<CompanyPage />} />
            <Route path="/DeveloperPage" element={<DeveloperPage />} />
            <Route path="/InvestorPage" element={<InvestorPage />} />
            <Route path="/MaintainerPage" element={<MaintainerPage />} />
          </Routes>
        </Layout>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;

