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
import { useState } from 'react';
import { Button, Collapse } from 'react-bootstrap';

export default function MetadataView({ metadata, initiallyOpen = false }: { metadata?: Record<string, any>; initiallyOpen?: boolean }) {
    function isHex(value: string): boolean {
        const re = /0x[0-9A-Fa-f]*/g;
        return re.test(value);
    }
    function truncate(str: string, n: number): string {
        return str.length > n ? str.substring(0, n - 1) + '...' : str;
    }

    const [open, setOpen] = useState(initiallyOpen);

    function render(metadata: Record<string, any>, key: string): any {
        const value = metadata?.[key];
        if (value == undefined) {
            return '';
        }
        if (typeof value == 'object') {
            return renderList(value);
        }

        const string = value.toString();
        if (string.length < 32 && isHex(string) && key.toLowerCase().indexOf('hash') == -1) {
            return parseInt(string.substring(2), 16);
        }
        return truncate(string, 50);
    }
    function renderList(metadata?: Record<string, any>) {
        if (!metadata) {
            return <></>;
        }
        return (
            <ul>
                {Object.keys(metadata).map((key) => (
                    <li key={key}>
                        <strong>{key}</strong> {render(metadata, key)}
                    </li>
                ))}
            </ul>
        );
    }

    if (!metadata) {
        return <></>;
    }
    return (
        <>
            <Button variant="link" onClick={() => setOpen(!open)} aria-controls="collapse-metadata" aria-expanded={open}>
                Metadata
            </Button>
            <Collapse in={open}>
                <div id="collapse-metadata">{renderList(metadata)}</div>
            </Collapse>
        </>
    );
}
