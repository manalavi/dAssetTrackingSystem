import React from 'react';
import { Table } from 'react-bootstrap';
import BlockChainExplorer from '../components/BlockChainExpolorer';
export default function bchExplorer() {
    return (
        <div>
            <Table>
                    <thead>
                        <tr>
                            <th>Block</th>
                            <th>Transaction Account</th>
                            <th>TimeStamp</th>
                            <th>Gas Used</th>
                            <th>Transaction Hash</th>
                        </tr>
                    </thead>
                <BlockChainExplorer/>
        </div>
    )
}