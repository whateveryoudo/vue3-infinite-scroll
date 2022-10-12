/*
 * @Author: ykx
 * @Date: 2022-10-10 11:35:33
 * @LastEditTime: 2022-10-12 10:24:51
 * @LastEditors: Please set LastEditors
 * @Description: 
 * @FilePath: \vue3-infinite-scroll\src\components\type.ts
 */
export interface ScrollOption {
    dir: string;
    step: number;
    singleStepDis: number;
    singleDataCount: number;
    hoverStop: boolean;
    waitTime: number;
    autoPlay: boolean;
    loop: boolean;
    slideIndex: number;
}