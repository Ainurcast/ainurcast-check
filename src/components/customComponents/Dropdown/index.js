import React, { PureComponent } from "react";
import { CustomTextInput as TextInput, IconButton } from "..";
import PropTypes from "prop-types";

class CustomDropDown extends PureComponent {
    constructor(props) {
        super(props);
        this.dropDownRef = React.createRef();
        this.state = {
            openDropdownList: false,
            ddInputValue: this.filterByValue(),
            dropDownData: props.data || [],
            activeIndex: this.computeActiveIndex(),
        };
        this.createReferences(props.data);
    }

    createReferences = (data = []) => {
        this.dropDownRef = data.reduce((acc, el, i) => {
            acc[i] = React.createRef();
            return acc;
        }, {});
    };

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
            this.setState({
                ddInputValue: this.filterByValue(),
            });
        }
        if (prevProps.data.length !== this.props.data.length) {
            const { data } = this.props;
            const activeIndex = this.computeActiveIndex();
            this.createReferences(data);
            this.setState({
                dropDownData: this.props.data,
                activeIndex,
            });
        }
    }

    computeActiveIndex = () => {
        const { data, value } = this.props;
        return data.findIndex((item) => item?.value === value);
    };

    handleClickOutside = (event) => {
        if (this.parentNode.contains(event.target)) return;
        this.setState({
            openDropdownList: false,
            dropDownData: this.props.data,
            ddInputValue: this.filterByValue(),
            activeIndex: this.computeActiveIndex(),
        });
    };

    toggleDropDown = (value) => {
        this.setState(
            {
                openDropdownList: value,
                activeIndex: this.computeActiveIndex(),
            },
            () => {
                if (value) {
                    this.scrollIntoView(this.state.activeIndex);
                }
            }
        );
    };

    filterDropDownList = (value) => {
        const { data = [] } = this.props;
        return data?.filter((ddItem, i) =>
            ddItem.text?.toLowerCase().includes(value?.toLowerCase())
        );
    };

    handleInputChange = (e, value) => {
        const { data = [] } = this.props;
        const finalDropDownList = value ? this.filterDropDownList(value) : data;
        this.setState({
            ddInputValue: value,
            dropDownData: finalDropDownList,
        });
    };

    filterByValue = () => {
        const { data = [], value } = this.props;
        return (
            data.filter((option) => option?.value === value)?.[0]?.text || ""
        );
    };

    handleItemClick = (e, text, value, i) => {
        const { onChange, data } = this.props;
        this.setState(
            {
                ddInputValue: text,
                openDropdownList: false,
                dropDownData: data,
                activeIndex: 0,
            },
            () => {
                onChange(e, text, value, i);
            }
        );
    };

    setRef = (node) => {
        this.parentNode = node;
    };

    clearFocus = () => {
        Object.keys(this.dropDownRef).forEach((ddElement) => {
            const currentElement = this.dropDownRef[ddElement]?.current;
            if (currentElement?.classList.contains("focussed-item")) {
                currentElement.classList.remove("focussed-item");
            }
        });
    };

    scrollIntoView = (newIndex) => {
        if (this.dropDownRef?.[newIndex]) {
            const { current } = this.dropDownRef?.[newIndex];
            if (current) {
                current.classList.add("focussed-item");
                current.scrollIntoView({
                    block: "nearest",
                    inline: "start",
                });
            }
        }
    };

    setFocusAndScroll = (key, index = 0) => {
        const { activeIndex, dropDownData } = this.state;
        let newIndex = index;
        const drodownDataLength = dropDownData?.length;
        if (key === "ArrowDown") {
            // Check for overflow
            newIndex = (activeIndex + 1) % drodownDataLength;
        } else if (key === "ArrowUp") {
            // check for underflow
            if (activeIndex <= 0) {
                newIndex = drodownDataLength - 1;
            } else {
                newIndex = activeIndex - 1;
            }
        }
        this.setState({
            activeIndex: newIndex,
        });
        this.scrollIntoView(newIndex);
    };

    handleEnter = (e) => {
        const { activeIndex, openDropdownList, dropDownData } = this.state;
        if (openDropdownList) {
            const { text = "", value = "" } = dropDownData?.[activeIndex] ?? {};
            this.handleItemClick(e, text, value, activeIndex);
        }
    };

    handleKeyDown = (e) => {
        switch (e.key) {
            case "ArrowDown":
            case "ArrowUp":
                this.clearFocus();
                this.setFocusAndScroll(e.key);
                break;
            case "Enter":
                this.handleEnter(e);
                break;
            default:
                break;
        }
    };

    render() {
        const { openDropdownList, ddInputValue, dropDownData } = this.state;
        const {
            label,
            value: selectedDropDownValue,
            name,
            helperText,
            disabled,
            required,
            error,
            ...rest
        } = this.props;
        return (
            <div className="dropdown-container" ref={this.setRef}>
                <TextInput
                    required={required}
                    onClick={() => this.toggleDropDown(true)}
                    placeholder="Search an item"
                    onChange={(e, value) => this.handleInputChange(e, value)}
                    name={name}
                    label={label}
                    value={ddInputValue}
                    disabled={disabled}
                    error={error}
                    onKeyDown={this.handleKeyDown}
                    helperText={helperText}
                    iconClass="caret-position"
                    inputProps={
                        <IconButton
                            onClick={() =>
                                this.toggleDropDown(!openDropdownList)
                            }
                        >
                            <img
                                src="/assets/caret.svg"
                                alt="caret"
                                className={
                                    openDropdownList ? "caret-open" : "caret"
                                }
                            />
                        </IconButton>
                    }
                />
                {openDropdownList && (
                    <ul className="dropdown-list" ref={this.dropDownRef}>
                        {!dropDownData?.length > 0 ? (
                            <div className="dd-empty-state">
                                No results found
                            </div>
                        ) : (
                            dropDownData?.map((ddData, i) => {
                                const { text = "", value = "" } = ddData;
                                const isSelectedItem =
                                    selectedDropDownValue === value;
                                return (
                                    <li
                                        className="dd-item"
                                        onClick={(e) =>
                                            this.handleItemClick(
                                                e,
                                                text,
                                                value,
                                                i
                                            )
                                        }
                                        ref={this.dropDownRef[i]}
                                    >
                                        <div className="dd-item-wrapper">
                                            <span
                                                className={
                                                    isSelectedItem
                                                        ? "selected-dd-item-text"
                                                        : "dd-item-text"
                                                }
                                            >
                                                {ddData.text}
                                            </span>
                                            {isSelectedItem && (
                                                <img src="/assets/dd-tick.svg" />
                                            )}
                                        </div>
                                    </li>
                                );
                            })
                        )}
                    </ul>
                )}
            </div>
        );
    }
}

CustomDropDown.propTypes = {
    name: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    error: PropTypes.bool,
    passwordField: PropTypes.bool,
    helperText: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    data: PropTypes.array,
};

CustomDropDown.defaultProps = {
    name: "",
    helperText: "",
    label: "",
    value: "",
    disabled: false,
    required: false,
    passwordField: false,
    error: false,
    data: [],
    onChange: () => {},
    data: [],
};

export default CustomDropDown;
