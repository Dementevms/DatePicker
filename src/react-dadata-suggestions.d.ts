import React, { Component } from 'react';

declare module 'react-dadata-suggestions' {

    interface DadataSuggestionsProps {
        name?: string
        minChars?: string
        deferRequestBy?: string
        token?: string
        query?: string
        receivePropsBehaveLikeOnChange: boolean

        onSelect: CallableFunction
        onChange: CallableFunction
    }

    export default class DadataSuggestions extends Component<DadataSuggestionsProps> {}
}
