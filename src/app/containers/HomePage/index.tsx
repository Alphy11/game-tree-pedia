import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Heriarchy } from 'app/components/Heirarchy';
import TwilightCoreRules from 'app/content/POKRules.json';
import FactionInfo from 'app/content/FactionList.json';
import { Search, SearchProvider } from 'app/components/Search';
import { StoreProvider } from 'app/components/Store';
import { Header } from 'app/components/Header';
import styled from 'styled-components';

const AppRoot = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

export function HomePage() {
    return (
        <SearchProvider>
            <StoreProvider>
                <Helmet>
                    <title>Home Page</title>
                    <meta
                        name="description"
                        content="A Boilerplate application homepage"
                    />
                </Helmet>
                <AppRoot>
                    <Header />
                    <Search />
                    <Heriarchy
                        rules={[
                            ...TwilightCoreRules,
                            {
                                id: 'factions',
                                additional: {
                                    title: 'FACTIONS',
                                },
                                content: [
                                    'Comprehensive list of factions and abilities',
                                ],
                                type: 'root',
                                subtree: FactionInfo,
                            } as any,
                        ]}
                    />
                </AppRoot>
            </StoreProvider>
        </SearchProvider>
    );
}
