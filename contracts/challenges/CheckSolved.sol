//SPSPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/// @title Hitcon CheckSolved ERC1155 proof
/// @author hklin
/// @notice This contract issue prood of solve as an NFT
contract CheckSolved is ERC1155Supply, Ownable, ReentrancyGuard {
    /*************************
     **    MAIN VARIABLE     **
     *************************/

    mapping(uint256 => address) public chalContract;

    /// @notice Noted that the uri should follow: http(ipfs)://.../{id}.json
    ///         without the '/{id}.json part'. Eg: uri = https://hitcoin
    /// @dev    Becareful when setting the uri_. Remeber to follow the rule
    ///         https://eips.ethereum.org/EIPS/eip-1155#metadata
    constructor(string memory uri_) ERC1155(uri_) {}

    /*************************
     **    HELPER SECTION    **
     *************************/
    modifier checkSource(uint256 chalNum) {
        require(chalNum > 0 && chalNum <= 5, "out of range");
        require(chalContract[chalNum] != address(0), "chalContract not set");
        require(
            msg.sender == chalContract[chalNum],
            "chalContract mismatch sender"
        );
        _;
    }

    /*************************
     **     USERS SECTION    **
     *************************/

    function uri(uint256 tokenId) public view override returns (string memory) {
        require(exists(tokenId), "tokenId does not exist");

        return
            string(
                abi.encodePacked(
                    super.uri(tokenId),
                    "/",
                    Strings.toString(tokenId),
                    ".json"
                )
            );
    }

    /// @notice This function should only be called by valid checkSolved. Also,
    ///         logic of preventing double minting was implemented in chalContract
    /// @dev    Prevent double minting and reentery attack. Make sure chalContract
    ///         address is correct and preventing double minting logic is correct.
    function chal1Solved(address _solver) external checkSource(1) nonReentrant {
        _mint(_solver, 1, 1, "");
    }

    function chal2Solved(address _solver) external checkSource(2) nonReentrant {
        _mint(_solver, 2, 1, "");
    }

    function chal3Solved(address _solver) external checkSource(3) nonReentrant {
        _mint(_solver, 3, 1, "");
    }

    function chal4Solved(address _solver) external checkSource(4) nonReentrant {
        _mint(_solver, 4, 1, "");
    }

    function chal5Solved(address _solver) external checkSource(5) nonReentrant {
        _mint(_solver, 5, 1, "");
    }

    /*************************
     **     ADMIN SECTION    **
     *************************/

    /// @notice Set the CheckSolved contract address by owner.
    function setChalContractAddress(uint256 chalNum, address _address)
        external
        onlyOwner
    {
        require(chalNum > 0 && chalNum <= 5, "out of range");
        chalContract[chalNum] = _address;
    }

    /// @notice Set the new URI for the ERC1155.
    /// @dev    Becareful of the uri issue.
    function setURI(string memory newuri) public onlyOwner {
        super._setURI(newuri);
    }
}
