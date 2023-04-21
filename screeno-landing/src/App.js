  import React, { Component } from "react";
  import { Route, Routes } from "react-router-dom";
  import web3Connection from './web3Connection';
  import Contract from './Contract';

  import Formate from './utils/Formate';
  import {Button, Wrap,WrapItem, Show,HStack, Flex, Box} from "@chakra-ui/react";
  import 'semantic-ui-css/semantic.min.css'

  import { BrowserRouter, Switch, Link, Redirect } from 'react-router-dom';
  import { Menu, Divider } from "semantic-ui-react";
  import Footer from "components/Footer";
  import NavBar from "components/NavBar";
  import Home from "pages/Home";
  import SignUp from "pages/SignUp";
  import SignOut from "pages/SignOut";
  import UserAccount from 'pages/UserAccount';
  import Dashboard from "pages/Dashboard";
  import SignIn from "pages/SignIn";
  import NotFound from "pages/NotFound";
import Course from "pages/Course";

  class App extends Component {
    state = {
      web3: null,
      account: null,
      contract: null,
      balance: null,
      activeItem: 'home',
      signedUp: false,
      loggedIn: false,
      username: ''
      //color: 'teal'
    };
    handleItemClick = (e, { name }) => this.setState({ activeItem: name, color: 'teal' })

    componentDidMount = async () => {
      try {
        const web3 = await web3Connection();
        const contract = await Contract(web3);
        const accounts = await web3.eth.getAccounts();
        this.setState({ web3, contract, account: accounts[0] }, this.start);
      } catch (error) {
        alert(
          `Failed to load web3`,
        );
        console.error(error);
      }

      await this.getAccount();
    };

    start = async () => {
      await this.getAccount();
      const { web3, contract, account } = this.state;

      console.log("web3 =", web3);
      console.log("Contract =", contract);
      console.log("Acoount =", account);
    };

    getAccount = async () => {
      if (this.state.web3 !== null || this.state.web3 !== undefined) {
        await window.ethereum.on('accountsChanged', async (accounts) => {
          this.setState({
            account: accounts[0],
            loggedIn: false
          });

          this.state.web3.eth.getBalance(accounts[0], (err, balance) => {
            if (!err) {
              this.setState({ balance: Formate(this.state.web3.utils.fromWei(balance, 'ether')) });
            }
          });
        });
      }
    }

    accountCreated = async (signedUp) => {
      this.setState({ signedUp });
    }

    userSignedIn = async (loggedIn, username) => {
      this.setState({ loggedIn, username });
    }

    loggedOut = async (loggedIn) => {
      this.setState({ loggedIn });
    }
    render()
    {
      const { activeItem, color } = this.state;

      if (!this.state.web3) {
        return <div>Loading Web3, accounts, and contract...</div>;
      }
      return (
    <div>
      

      <Box bg="gray.900"  py="1.5rem" paddingRight="1.5rem">
      <div className="home-nav">
                <Menu stackable inverted secondary size='large'>
                  <Menu.Item
                    name='home'
                    color={color}
                    active={activeItem === 'home'}
                    onClick={this.handleItemClick}
                    as={Link}
                    to='/'
                  />
                  <Menu.Item
                    name='help'
                    color={color}
                    active={activeItem === 'help'}
                    onClick={this.handleItemClick}
                    as={Link}
                    to='/help'
                  />
                  {
                    this.state.loggedIn ?
                      <Menu.Item
                        position='right'
                        name='user account'
                        color={color}
                        active={activeItem === 'user account'}
                        onClick={this.handleItemClick}
                        as={Link}
                        to='/user-account'
                      />
                      :
                      console.log('')
                  }
                  {
                    !this.state.loggedIn ?
                      <Menu.Item
                        position='right'
                        name='sign in'
                        color={color}
                        active={activeItem === 'sign in'}
                        onClick={this.handleItemClick}
                        as={Link}
                        to='sign-in'
                      />
                      :
                      console.log('nahh')
                  }

                  {
                    this.state.loggedIn ?
                      <Menu.Item
                        name='sign out'
                        color='red'
                        active={activeItem === 'sign out'}
                        onClick={this.handleItemClick}
                        as={Link}
                        to='/sign-out'
                      />
                      :
                      <Menu.Item
                        name='sign up'
                        color={color}
                        active={activeItem === 'sign up'}
                        onClick={this.handleItemClick}
                        as={Link}
                        to='/sign-up'
                      />
                  }
                </Menu>
              </div>
      {/* <Flex justifyContent="flex-end">
      <Show above="lg">
              <HStack spacing="1.125rem">
                <Button
                  color="blue"
                  to="/sign-in"
                  onClick={this.handleItemClick}
                >
                  Log In
                </Button>
                <Button  colorScheme="blue">
                  Start Free Trial
                </Button>
              </HStack>
            </Show>
      </Flex> */}
      </Box>
    
      
  {/* <Wrap spacing="1.875rem">

                <WrapItem>
                  <Button colorScheme="blue">
                    Log In
                  </Button>
                </WrapItem>
              </Wrap> */}
          {/* <NavBar /> */}
        
          <Routes>
            {/* <Route path="*" element={<NotFound />} />
            <Route path="/404" element={<NotFound />} /> */}
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn 
                        web3={this.state.web3}
                        contract={this.state.contract}
                        account={this.state.account}
                        signedUp={this.state.signedUp}
                        userSignedIn={this.userSignedIn}/>}/>
                        
            <Route path='/sign-up' 
                 element={   <SignUp
                      web3={this.state.web3}
                      contract={this.state.contract}
                      account={this.state.account}
                      accountCreated={this.accountCreated}
                    />
                 }
                  />
            <Route path="/sign-out" element={<SignOut/>}/>

            <Route path='/user-account' element={
                    // <UserAccount
                    //   account={this.state.account}
                    //   username={this.state.username}
                    // />
                  <Dashboard account={this.state.account}
                  username={this.state.username}/>
                  }
                  />

<Route path="/course" element={<Course/>}/>
          </Routes>
          <Footer />
    </div>
      
        
      );
    }

  }
  export default App;
