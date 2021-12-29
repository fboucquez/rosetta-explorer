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
import React, { ReactNode } from 'react';
import styles from './Background.module.scss';
export default function Background(props: { children?: ReactNode }) {
    return (
        <div className={styles.hero + ''}>
            {props.children}
            <svg viewBox="0 0 843 836" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="a" maskUnits="userSpaceOnUse" x="0" y="0" width="843" height="836">
                    <path fill="#fff" d="M0 0h843v836H0z" />
                </mask>
                <g mask="url(#a)">
                    <path fill="#fff" d="M216.75-180L558.317 35.75l-215.75 341.567L1 161.567z" />
                    <path fill="#fff" d="M646.381 91.376L558.317 35.75l-215.75 341.567 88.064 55.626z" />
                    <path fill="#C6DDFF" d="M646.381 91.376L558.317 35.75l-215.75 341.567 88.064 55.626z" />
                    <circle cx="730" cy="12" r="174" fill="#fff" />
                    <circle cx="391" cy="659" r="285" fill="#fff" />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M307 872c157.401 0 285-127.599 285-285 0-66.589-22.837-127.845-61.106-176.361C617.516 459.535 676 552.437 676 659c0 157.401-127.599 285-285 285-90.812 0-171.703-42.473-223.894-108.639C208.432 858.689 256.161 872 307 872z"
                        fill="#C6DDFF"
                    />
                    <path d="M411.748 266.714l476-113.324-139.859 468.89-336.141-355.566z" fill="#fff" />
                    <path d="M639 507l248.748-353.61-139.859 468.89L639 507z" fill="#C6DDFF" />
                    <path fill="#fff" d="M865.781 537l136.911 190.782-190.781 136.91-136.912-190.78z" />
                </g>
            </svg>
        </div>
    );
}
