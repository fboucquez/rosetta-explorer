/*
 * Copyright 2022 Fernando Boucquez
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import AccountPage from '@components/account/AccountPage';
import { rosettaClientFactory } from '@components/basic/GlobalContext';
import NetworkErrorPage from '@components/error/NetworkErrorPage';
import Explorer from '@components/layout/Explorer';
import { Utils } from '@services/Utils';
import { useRouter } from 'next/router';
import { AccountBalanceResponse, AccountCoinsResponse } from 'rosetta-client-typescript';
const AccountPageRoute = ({
    accountBalance,
    accountCoins,
}: {
    accountBalance?: AccountBalanceResponse;
    accountCoins?: AccountCoinsResponse;
}) => {
    const router = useRouter();
    const { blockchain, network, address } = router.query;
    if (!blockchain || !network || !address) {
        return <span />;
    }
    if (!accountBalance) {
        return (
            <NetworkErrorPage
                network={network.toString()}
                blockchain={blockchain.toString()}
                message={`Account with address ${address} not found`}
            />
        );
    }
    return (
        <Explorer network={network.toString()} blockchain={blockchain.toString()}>
            <AccountPage
                network={network.toString()}
                blockchain={blockchain.toString()}
                address={address.toString()}
                accountBalance={accountBalance}
                accountCoins={accountCoins}
            />
        </Explorer>
    );
};

export async function getServerSideProps(context: any) {
    const { blockchain, network, address }: { blockchain: string; network: string; address: string } = context.query;
    if (!blockchain || !network || !address) {
        return {
            props: {},
        };
    }
    const rosettaRestClientFactory = rosettaClientFactory.get(blockchain);
    const networkIdentifier = { network, blockchain };
    const accountBalance = await rosettaRestClientFactory
        .account()
        .accountBalance({
            network_identifier: networkIdentifier,
            account_identifier: { address: address },
        })
        .catch((e: Error) => {
            return null;
        });

    const accountCoins = await rosettaRestClientFactory
        .account()
        .accountCoins({
            network_identifier: networkIdentifier,
            account_identifier: { address: address },
            include_mempool: false,
        })
        .catch((e: Error) => {
            return null;
        });
    return Utils.processDataForServerSideRendering({ props: { accountBalance, accountCoins } });
}

export default AccountPageRoute;
